const express = require('express');
const router = express.Router();
const imagenController = require('../controllers/imagenController');
const verifyToken = require('../middlewares/authMiddleware');


router.get('/propiedad/:id/imagenes', imagenController.obtenerImagenes);
router.post('/propiedad/:id/imagenes', verifyToken, imagenController.guardarImagenes);

module.exports = router;