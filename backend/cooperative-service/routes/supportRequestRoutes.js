// /backend/cooperativa-service/routes/supportRequestRoutes.js
const express = require('express');
const router = express.Router();

const supportRequestController = require('../controllers/supportRequestController');

// Rutas para SupportRequest (solicitudes de apoyo)
router.post('/', supportRequestController.createSupportRequest);
router.get('/', supportRequestController.getAllSupportRequests);
router.put('/:id_request', supportRequestController.updateSupportRequest);

module.exports = router;
