// /backend/cooperativa-service/routes/memberRoutes.js
const express = require('express');
const router = express.Router();

const {
  crearMiembro,
  obtenerMiembros,
  obtenerMiembroPorId,
  actualizarMiembro,
  eliminarMiembro
} = require('../controllers/PerfilMiembroController');

// Rutas para MiembroCooperativa
router.post('/', crearMiembro);
router.get('/', obtenerMiembros);
router.get('/:id_miembro', obtenerMiembroPorId);
router.put('/:id_miembro', actualizarMiembro);
router.delete('/:id_miembro', eliminarMiembro);

module.exports = router;
