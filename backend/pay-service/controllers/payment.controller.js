// /backend/payment-service/controllers/payment.controller.js
const { Transaction } = require('transbank-sdk');
const PaymentIntent = require('../models/PaymentIntent');
const { tbkCommerceCode, tbkApiKey } = require('../config/env');
const { publish } = require('../utils/rabbitmq');// pendiente de crear utilidad 

exports.initPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;            // extraído del JWT por middleware

    // 1) Creamos el intent en DB
    const intent = await PaymentIntent.create({ userId, amount });

    // 2) Iniciamos transacción Webpay Plus
    const tx = new Transaction(
      tbkCommerceCode, tbkApiKey, Transaction.IntegrationType.TEST
    );
    const response = await tx.initTransaction(
      amount,
      `${intent.id_intent}`,        // buyOrder
      `${intent.id_intent}`,        // sessionId
      'https://localhost:3000/ok',  // returnUrl
      'https://localhost:3000/fail' // cancelUrl
    );

    // 3) Guardamos token_ws y URL de pago
    intent.token_ws = response.token;
    intent.url      = response.url;
    await intent.save();

    res.json({ url: response.url, token: response.token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error iniciando pago' });
  }
};
