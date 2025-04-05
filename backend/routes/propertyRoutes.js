// /backend/routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty } = require('../controllers/propertyController');
const verifyToken = require('../middlewares/authMiddleware');

// Rutas protegidas (para arrendadores, se asume que se necesita autenticación)
router.post('/create', verifyToken, createProperty);
router.get('/', getProperties); // Ruta pública para listar propiedades, o podrías protegerla si es necesario
router.get('/:id', getPropertyById); // Obtener propiedad por ID, público o protegido
router.put('/:id', verifyToken, updateProperty);
router.delete('/:id', verifyToken, deleteProperty);

module.exports = router;
