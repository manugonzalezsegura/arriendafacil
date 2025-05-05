//  /backend/auth-service/routes/authRoutes.js

const router = require('express').Router();
const ctrl = require('../controllers/authController');
const verify = require('../middlewares/authMiddleware');

router.post('/register', ctrl.register);
router.post('/login',    ctrl.login);
router.post('/refresh',  ctrl.refresh);
router.get('/profile',   verify, ctrl.getProfile);
router.put('/updateUser',verify, ctrl.updateUser);


router.post('/firebase-login', ctrl.firebaseLogin);



module.exports = router;
