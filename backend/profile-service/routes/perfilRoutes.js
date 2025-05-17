// backend/profile-service/routes/perfilRoutes.js
const router = require('express').Router();
const ctrl = require('../controllers/perfilController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET perfil por ID
router.get('/perfil-inquilino', authMiddleware, ctrl.getPerfil);

// POST crear o actualizar perfil
router.post('/perfil-inquilino', authMiddleware, ctrl.crearActualizarPerfil);

// GET schema
router.get('/perfil-inquilino/schema', authMiddleware, ctrl.getPerfilInquilinoSchema);

module.exports = router;
