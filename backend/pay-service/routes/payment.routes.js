// /backend/pay-service/routes/payment.routes.js

const express = require('express');
const router  = express.Router();
const { initPayment, confirmPayment } = require('../controllers/payment.controller');
const authMiddleware = require('../middlewares/authMiddleware'); // para extraer JWT

// Iniciar pago
router.post('/init', authMiddleware, initPayment);

// Confirmar pago
router.post('/confirm', authMiddleware, confirmPayment);

module.exports = router;
