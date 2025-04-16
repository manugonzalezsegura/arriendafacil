// /backend/cooperativa-service/routes/apiRoutes.js
const express = require('express');
const router = express.Router();

// Importar rutas 
const memberRoutes = require('./memberRoutes');
const groupRoutes = require('./groupRoutes');
const groupMemberRoutes = require('./groupMemberRoutes');
const supportRequestRoutes = require('./supportRequestRoutes');
const supportContributionRoutes = require('./supportContributionRoutes');
const userStubRoutes = require('./userStubRoutes');  // Importa la ruta de userStub tabla en todos los microservicios 
// Asignar rutas base para cada módulo


router.use('/members', memberRoutes);
router.use('/groups', groupRoutes);
router.use('/group-members', groupMemberRoutes); // o agrupados dentro de "groups" si prefieres
router.use('/support-requests', supportRequestRoutes);
router.use('/support-contributions', supportContributionRoutes);
router.use(userStubRoutes);  // Esto monta el endpoint userStub debe estar en todas las rutas de los microservicios 

module.exports = router;
