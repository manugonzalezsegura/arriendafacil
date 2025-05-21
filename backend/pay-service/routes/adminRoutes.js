// /backend/pay-service/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminPagosController = require('../controllers/adminPagosController');
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/verificarRol');

// ✅ Ruta para obtener todos los pagos mensuales
router.get('/pagos',verificarToken,verificarRol(['admin']),adminPagosController.getAllPagosMensuales);

// ✅ Ruta para actualizar un pago mensual
router.put('/pagos/:id_pago_mensual',verificarToken,verificarRol(['admin']),adminPagosController.updatePagoMensual);

module.exports = router;
