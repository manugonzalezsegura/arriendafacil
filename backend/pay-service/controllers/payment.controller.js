// /backend/pay-service/controllers/payment.controller.js

// 1️⃣ — IMPORTACIONES
const { WebpayPlus } = require('transbank-sdk');
const { IntentoPago, Usuario } = require('../models'); // Modelos compartidos (shared-models)
const { transbank } = require('../config/env');
const { publish } = require('../utils/rabbitmq'); // Utilidad para publicar eventos

// 2️⃣ — CONFIGURAR CLIENTE DE TRANSBANK (WebpayPlus)
const txClient = new WebpayPlus.Transaction();
console.log('✅ Cliente WebpayPlus.Transaction creado');

// ——— 1. INICIAR PAGO ———
exports.initPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const id_usuario = req.user.id_usuario;  // Extraído desde el JWT

    console.log('📥 Solicitud initPayment recibida:', { amount, id_usuario });

    // 📝 — CREAR INTENTO DE PAGO EN LA BD
    const intent = await IntentoPago.create({
      id_usuario,
      monto: amount,
      estado: 'initialized',
      moneda: 'CLP',
      proveedor: 'transbank'
    });

    console.log('✅ Intento de pago creado en BD:', intent.id_intento);

    // 📝 — INICIAR TRANSACCIÓN CON TRANSBANK
    const response = await txClient.create(
      `${intent.id_intento}`, // buyOrder
      `${intent.id_intento}`, // sessionId
      amount,
      process.env.PAYMENT_RETURN_URL  // URL de éxito frontend
    );

    console.log('✅ Transacción iniciada en Transbank:', response);

    // 📝 — GUARDAR TOKEN DE TRANSBANK EN LA BD
    intent.token_ws = response.token;
    await intent.save();

    console.log('✅ Token guardado en intento de pago:', response.token);

    // ✅ — DEVOLVER AL CLIENTE LA URL PARA IR AL PORTAL DE PAGO
    res.json({ url: response.url, token: response.token });

  } catch (err) {
    console.error('❌ Error en initPayment:', err);
    res.status(500).json({ error: 'Error iniciando el pago' });
  }
};

// ——— 2. CONFIRMAR PAGO ———
exports.confirmPayment = async (req, res) => {
  try {
    const { token_ws } = req.body;

    console.log('📥 Solicitud confirmPayment recibida:', { token_ws });

    // 📝 — CONFIRMAR ESTADO DE LA TRANSACCIÓN CON TRANSBANK
    const result = await txClient.commit(token_ws);

    console.log('✅ Resultado de commit Transbank:', result);

    // 📝 — SI EL PAGO FUE RECHAZADO
    if (result.response_code !== 0) {
      console.log('⚠ Pago rechazado con response_code:', result.response_code);

      await IntentoPago.update(
        { estado: 'failed' },
        { where: { token_ws } }
      );
      return res.status(400).json({ error: 'Pago no autorizado' });
    }

    // 📝 — MARCAR EL INTENTO COMO EXITOSO EN LA BD
    const intent = await IntentoPago.findOne({ where: { token_ws } });
    if (!intent) {
      console.log('❌ Intento de pago no encontrado para token:', token_ws);
      return res.status(404).json({ error: 'Intento de pago no encontrado' });
    }

    intent.estado = 'success';
    await intent.save();

    console.log('✅ Intento de pago actualizado a success:', intent.id_intento);

    // 📝 — BUSCAR DATOS DEL USUARIO
    const usuario = await Usuario.findByPk(intent.id_usuario);

    console.log('✅ Usuario encontrado:', usuario.id_usuario, usuario.nombre);

    // 📝 — PUBLICAR EVENTO EN RABBITMQ
    await publish('pago.confirmado', {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      monto: intent.monto,
      fecha: new Date().toISOString(),
      metodo: intent.proveedor
    });

    console.log('✅ Evento "pago.confirmado" publicado en RabbitMQ');

    // ✅ — RESPUESTA AL CLIENTE
    res.json({ message: 'Pago confirmado exitosamente', intent });

  } catch (err) {
    console.error('❌ Error en confirmPayment:', err);
    res.status(500).json({ error: 'Error confirmando el pago' });
  }
};
