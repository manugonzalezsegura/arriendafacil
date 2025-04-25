// /backend/payment-service/routes/payment.routes.js
const express = require('express');
const router  = express.Router();
const { initPayment,confirmPayment } = require('../controllers/payment.controller');
const authMiddleware = require('../middlewares/authMiddleware'); // para extraer JWT

router.post('/', authMiddleware, initPayment);
router.post('/init',    authMiddleware, initPayment);
router.post('/confirm', authMiddleware, confirmPayment);

module.exports = router;
