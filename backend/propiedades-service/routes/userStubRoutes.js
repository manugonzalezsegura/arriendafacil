///backend/propiedades-service/routes/userStubRoutes.js :

const express         = require('express');
const { syncUserStub } = require('../controllers/userStubController');
const router          = express.Router();

router.post('/usersync', syncUserStub);

module.exports = router;
