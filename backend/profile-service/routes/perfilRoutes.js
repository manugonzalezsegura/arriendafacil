// backend/profile-service/routes/perfilRoutes.js
const router = require('express').Router();
const { getPerfil, updatePerfil } = require('../controllers/perfilController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:usuarioId', authMiddleware, getPerfil);
router.put('/:usuarioId', authMiddleware, updatePerfil);

module.exports = router;
