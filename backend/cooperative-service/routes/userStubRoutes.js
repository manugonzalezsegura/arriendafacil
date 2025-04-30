// /backend/cooperativa-service/routes/userStubRoutes.js
const express = require('express');
const router = express.Router();

const { syncUsuario } = require('../controllers/userStubController');

// Ruta para sincronizar usuario
router.post('/syncUsuario', syncUsuario);

module.exports = router;
