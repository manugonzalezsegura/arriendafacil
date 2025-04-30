// /backend/cooperativa-service/routes/supportRequestRoutes.js
const express = require('express');
const router = express.Router();

const {
  crearSolicitudApoyo,
  obtenerSolicitudesApoyo,
  actualizarSolicitudApoyo
} = require('../controllers/SolicitudApoyoController');

// Rutas para SolicitudApoyo
router.post('/', crearSolicitudApoyo);
router.get('/', obtenerSolicitudesApoyo);
router.put('/:id_solicitud', actualizarSolicitudApoyo);

module.exports = router;
