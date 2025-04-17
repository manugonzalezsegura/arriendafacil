// /backend/payment-service/routes/payment.routes.js
const express = require('express');
const router  = express.Router();
const { initPayment } = require('../controllers/payment.controller');
const authMiddleware = require('../middleware/auth'); // para extraer JWT

router.post('/', authMiddleware, initPayment);

module.exports = router;
