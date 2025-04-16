// /backend/cooperativa-service/routes/supportContributionRoutes.js


const express = require('express');
const router = express.Router();

const supportContributionController = require('../controllers/supportContributionController');

// Rutas para SupportContribution (aportaciones)
router.post('/', supportContributionController.createSupportContribution);
router.get('/:id_request', supportContributionController.getContributionsByRequest);

module.exports = router;
