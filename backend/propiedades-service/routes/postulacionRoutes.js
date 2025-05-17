// /backend/propiedades-service/routes/postulacionRoutes.js
const express = require('express');
const router = express.Router();

const {
  crearPostulacion,
  obtenerPostulacionesRecibidas,
  obtenerMisPostulaciones,
  actualizarEstadoPostulacion
} = require('../controllers/postulacionController');

const verificarToken = require('../middlewares/authMiddleware');

router.post('/', verificarToken, crearPostulacion);
router.get('/recibidas', verificarToken, obtenerPostulacionesRecibidas);
router.get('/mis-postulaciones', verificarToken, obtenerMisPostulaciones);
router.put('/:id_postulacion', verificarToken, actualizarEstadoPostulacion);

module.exports = router;
