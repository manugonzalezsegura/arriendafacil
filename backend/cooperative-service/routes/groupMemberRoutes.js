// /backend/cooperativa-service/routes/groupMemberRoutes.js
const express = require('express');
const router = express.Router();

const {
  solicitarIngresoGrupo,
  obtenerSolicitudesPorGrupo,
  actualizarEstadoSolicitud
} = require('../controllers/MembresiaCooperativaController');

// Rutas para solicitudes de ingreso a un grupo
router.post('/:id_cooperativa/solicitudes', solicitarIngresoGrupo);
router.get('/:id_cooperativa/solicitudes', obtenerSolicitudesPorGrupo);
router.put('/solicitudes/:id', actualizarEstadoSolicitud);

module.exports = router;
