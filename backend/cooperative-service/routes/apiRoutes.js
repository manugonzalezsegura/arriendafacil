// /backend/cooperativa-service/routes/apiRoutes.js
const express = require('express');
const router = express.Router();

// Importar rutas
const memberRoutes = require('./memberRoutes');
const groupRoutes = require('./groupRoutes');
const groupMemberRoutes = require('./groupMemberRoutes');
const supportRequestRoutes = require('./supportRequestRoutes');
const supportContributionRoutes = require('./supportContributionRoutes');
const userStubRoutes = require('./userStubRoutes');

// Rutas base
router.use('/miembros', memberRoutes);
router.use('/cooperativas', groupRoutes);
router.use('/miembros-grupo', groupMemberRoutes);
router.use('/solicitudes-apoyo', supportRequestRoutes);
router.use('/aportaciones-apoyo', supportContributionRoutes);
router.use(userStubRoutes);

module.exports = router;
