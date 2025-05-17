// backend\profile-service\routes\mlRoutes.js
const express = require('express');
const router = express.Router();
const { evaluarRiesgoInquilino } = require('../controllers/mlController');

router.post('/ml/evaluar/:id_usuario', evaluarRiesgoInquilino);

module.exports = router;
