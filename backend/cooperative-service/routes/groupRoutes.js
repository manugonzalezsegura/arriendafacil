// /backend/cooperativa-service/routes/groupRoutes.js
const express = require('express');
const router = express.Router();

const investmentGroupController = require('../controllers/CooperativaController');

router.post('/', investmentGroupController.crearCooperativa);
router.get('/', investmentGroupController.obtenerCooperativas);
router.get('/:id_cooperativa', investmentGroupController.obtenerCooperativaPorId);
router.put('/:id_cooperativa', investmentGroupController.actualizarCooperativa);
router.delete('/:id_cooperativa', investmentGroupController.eliminarCooperativa);

module.exports = router;