// /backend/pay-service/routes/payment.routes.js

const express = require('express');
const router  = express.Router();
const { confirmPayment,getPagosMensuales,initPagoMensual,confirmPagoMensual,crearPagosMensuales,getPagosRecibidos } = require('../controllers/payment.controller');
const authMiddleware = require('../middlewares/authMiddleware'); // para extraer JWT

// Iniciar pago
router.post('/init', authMiddleware,initPagoMensual );

router.post('/mensual/confirm', authMiddleware, confirmPagoMensual);
router.post('/mensuales/crear', authMiddleware, crearPagosMensuales);
router.get('/recibidos', authMiddleware, getPagosRecibidos);
// Confirmar pago
router.post('/confirm', authMiddleware, confirmPayment);
router.get('/mensuales/:id_postulacion', authMiddleware, getPagosMensuales);
module.exports = router;
