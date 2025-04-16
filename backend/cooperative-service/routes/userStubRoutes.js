///backend/propiedades-service/routes/userStubRoutes.js :

const express = require('express');
const router = express.Router();
const { syncUserStub } = require('../controllers/userStubController');

router.post('/usersync', syncUserStub);

module.exports = router;
