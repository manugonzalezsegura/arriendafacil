// backend/perfil-service/routes/perfilRoutes.js
const router = require('express').Router();
const { getPerfil, updatePerfil } = require('../controllers/perfilController');

router.get('/:usuarioId', getPerfil);
router.put('/:usuarioId', updatePerfil);

module.exports = router;
