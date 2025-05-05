////backend/propiedades-service/routes/propertyRoutes.js

const router = require('express').Router();
const ctrl = require('../controllers/propertyController');
const verify = require('../middlewares/authMiddleware');



router.post('/', verify, ctrl.createProperty);
router.put('/:id', verify, ctrl.updateProperty);
router.delete('/:id', verify, ctrl.deleteProperty);

router.get('/',            ctrl.getProperties);
router.get('/:id',         ctrl.getPropertyById);

module.exports = router; 
