// /backend/cooperativa-service/routes/supportContributionRoutes.js
const express = require('express');
const router = express.Router();

const {
  crearContribucion,
  obtenerContribucionesPorSolicitud
} = require('../controllers/ContribucionApoyoController');

// Rutas para ContribucionApoyo
router.post('/', crearContribucion);
router.get('/:id_solicitud', obtenerContribucionesPorSolicitud);

module.exports = router;
