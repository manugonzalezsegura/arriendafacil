// backend/perfil-service/routes/valoracionRoutes.js
const router = require('express').Router();
const {
  createValoracion,
  listRecibidas,
  listHechas
} = require('../controllers/valoracionController');

router.post('/', createValoracion);
router.get('/recibidas/:usuarioId', listRecibidas);
router.get('/hechas/:usuarioId',    listHechas);

module.exports = router;
