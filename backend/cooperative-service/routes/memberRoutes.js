// /backend/cooperativa-service/routes/memberRoutes.js
const express = require('express');
const router = express.Router();

const cooperativeMemberController = require('../controllers/cooperativeMemberController');

// Rutas para CooperativeMember
router.post('/', cooperativeMemberController.createMember);
router.get('/', cooperativeMemberController.getAllMembers);
router.get('/:id_member', cooperativeMemberController.getMemberById);
router.put('/:id_member', cooperativeMemberController.updateMember);
router.delete('/:id_member', cooperativeMemberController.deleteMember);

module.exports = router;
