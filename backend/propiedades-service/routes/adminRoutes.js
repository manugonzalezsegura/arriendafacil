// /backend/propiedades-service/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminPropiedadController = require('../controllers/adminPropiedadController');
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/verificarRol'); // ✅ SIN llaves


// ✅ GET - Listar todas las propiedades (solo admin)
router.get('/propiedades',verificarToken,verificarRol(['admin']),adminPropiedadController.getAllPropiedades);

// ✅ PUT - Actualizar una propiedad por ID (solo admin)
router.put('/propiedades/:id',verificarToken,verificarRol(['admin']),adminPropiedadController.updatePropiedad);

module.exports = router;
