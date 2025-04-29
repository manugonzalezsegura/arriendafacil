// /backend/payment-service/controllers/payment.controller.js
const { Transaction } = require('transbank-sdk');
const PaymentIntent = require('../models/PaymentIntent');
const UserStub        = require('../models/UserStub');
const { tbkCommerceCode, tbkApiKey } = require('../config/env');
const { publish } = require('../utils/rabbitmq');// pendiente de crear utilidad 


// Prepara un cliente de Transbank (sandbox o live según env)
const txClient = new Transaction(
  transbank.commerceCode,
  transbank.apiKey,
  IntegrationType[transbank.integration]
);


// ——— 1. INICIAR PAGO ———
// Recibe monto y crea un intent de pago en estado "initialized"
exports.initPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const id_user    = req.user.id_user;  // extraído en tu middleware JWT

    // 1. Guarda el intent en tu BD
    const intent = await PaymentIntent.create({
      id_user,
      amount,
      status:   'initialized',
      currency: 'CLP',
      provider: 'transbank'
    });

    // 2. Solicita a Transbank la transacción
    const response = await txClient.initTransaction(
      amount,
      `${intent.id_intent}`, // buyOrder
      `${intent.id_intent}`, // sessionId
      process.env.PAYMENT_RETURN_URL,  // https://tu-frontend/ok  medificar esto ya que 
      process.env.PAYMENT_CANCEL_URL   // https://tu-frontend/fail
    );

    // 3. Actualiza tu intent con token/URL
    intent.token_ws = response.token;
    intent.url      = response.url;
    await intent.save();

    // 4. Devuelve al cliente la URL de pago
    res.json({ url: response.url, token: response.token });
  } catch (err) {
    console.error('Error initPayment:', err);
    res.status(500).json({ error: 'Error iniciando el pago' });
  }
};



// ——— 2. CONFIRMAR PAGO ———
// Recibe el token_ws devuelto por Webpay y valida si el pago fue exitoso
// —— 2) CONFIRMAR PAGO ——
exports.confirmPayment = async (req, res) => {
  try {
    const { token_ws } = req.body;

    // 1. Confirma con Transbank el status del pago
    const result = await txClient.commit(token_ws);

    // 2. Si no fue exitoso
    if (result.response_code !== 0) {
      await PaymentIntent.update(
        { status: 'failed' },
        { where: { token_ws } }
      );
      return res.status(400).json({ error: 'Pago no autorizado' });
    }

    // 3. Marca el intent como success
    const intent = await PaymentIntent.findOne({ where: { token_ws } });
    intent.status = 'success';
    await intent.save();

    // 4. Carga datos de usuario para el evento
    const user = await UserStub.findByPk(intent.id_user);

    // 5. Publica evento "pago.confirmado"
    await publish('pago.confirmado', {
      id_user: user.id_user,
      nombre:  user.nombre,
      monto:   intent.amount,
      fecha:   new Date().toISOString(),
      metodo:  intent.provider
    });

    res.json({ message: 'Pago confirmado con éxito', intent });
  } catch (err) {
    console.error('Error confirmPayment:', err);
    res.status(500).json({ error: 'Error confirmando el pago' });
  }
};
