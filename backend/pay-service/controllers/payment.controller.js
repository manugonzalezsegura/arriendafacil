// /backend/payment-service/controllers/payment.controller.js
const { Transaction } = require('transbank-sdk');
const PaymentIntent = require('../models/PaymentIntent');
const UserStub        = require('../models/UserStub');
const { tbkCommerceCode, tbkApiKey } = require('../config/env');
const { publish } = require('../utils/rabbitmq');// pendiente de crear utilidad 

// ——— 1. INICIAR PAGO ———
// Recibe monto y crea un intent de pago en estado "initialized"
exports.initPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const id_user = req.user.id; // ID extraído desde el JWT (debe coincidir con UserStub)

    // 1) Creamos el intent de pago en estado 'initialized'
    const intent = await PaymentIntent.create({
      id_user,
      amount,
      status: 'initialized',
      currency: 'CLP',
      provider: 'transbank'
    });

    // 2) Iniciamos la transacción con Transbank
    const tx = new Transaction(
      tbkCommerceCode,
      tbkApiKey,
      Transaction.IntegrationType.TEST
    );

    const response = await tx.initTransaction(
      amount,
      `${intent.id_intent}`, // buyOrder
      `${intent.id_intent}`, // sessionId
      'https://localhost:3000/ok',   // returnUrl (cambia luego en prod)
      'https://localhost:3000/fail'  // cancelUrl
    );

    // 3) Guardamos token_ws y URL de pago
    intent.token_ws = response.token;
    intent.url = response.url;
    await intent.save();

    res.json({ url: response.url, token: response.token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error iniciando el pago' });
  }
};


// ——— 2. CONFIRMAR PAGO ———
// Recibe el token_ws devuelto por Webpay y valida si el pago fue exitoso
exports.confirmPayment = async (req, res) => {
  try {
    const { token_ws } = req.body;

    const tx = new Transaction(
      tbkCommerceCode,
      tbkApiKey,
      Transaction.IntegrationType.TEST
    );

    // 1) Confirmamos el estado del pago
    const result = await tx.commit(token_ws);

    if (result.response_code !== 0) {
      // Actualizamos el estado a 'failed' si no fue exitoso
      await PaymentIntent.update(
        { status: 'failed' },
        { where: { token_ws } }
      );
      return res.status(400).json({ error: 'Pago no autorizado' });
    }

    // 2) Buscamos el intent y actualizamos a 'success'
    const intent = await PaymentIntent.findOne({ where: { token_ws } });

    intent.status = 'success';
    await intent.save();

    // 3) Obtenemos datos del usuario asociado (opcional pero útil para el evento)
    const user = await UserStub.findByPk(intent.id_user);

    // 4) Emitimos evento "pago.confirmado"
    await publish('pago.confirmado', {
      id_user: user.id_user,
      nombre: user.nombre,
      monto: intent.amount,
      fecha: new Date().toISOString(),
      metodo: intent.provider
    });

    res.json({ message: 'Pago confirmado con éxito', intent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error confirmando el pago' });
  }
};