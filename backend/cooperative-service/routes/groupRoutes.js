// /backend/cooperativa-service/routes/groupRoutes.js
const express = require('express');
const router = express.Router();

const investmentGroupController = require('../controllers/investmentGroupController');

// Rutas para InvestmentGroup
router.post('/', investmentGroupController.createGroup);
router.get('/', investmentGroupController.getAllGroups);
router.get('/:id_group', investmentGroupController.getGroupById);
router.put('/:id_group', investmentGroupController.updateGroup);
router.delete('/:id_group', investmentGroupController.deleteGroup); // Soft delete

module.exports = router;
