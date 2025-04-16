// /backend/cooperativa-service/routes/groupMemberRoutes.js
const express = require('express');
const router = express.Router();

const groupMemberController = require('../controllers/groupMemberController');

// Rutas para GroupMember (solicitudes para unirse a un grupo)
router.post('/:id_group/requests', groupMemberController.requestJoinGroup);
router.get('/:id_group/requests', groupMemberController.getGroupRequests);
router.put('/requests/:id', groupMemberController.updateGroupRequestStatus);

module.exports = router;
