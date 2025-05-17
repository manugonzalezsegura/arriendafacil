// backend\auth-service\routes\rolRoutes.js

const router = require('express').Router();
const ctrl = require('../controllers/rolController');
const verify = require('../middlewares/authMiddleware'); // para proteger si quieres



router.get('/:id_usuario', verify, ctrl.obtenerRoles);

module.exports = router;
