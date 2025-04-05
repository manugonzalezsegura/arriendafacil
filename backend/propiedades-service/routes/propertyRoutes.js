

const router = require('express').Router();
const ctrl = require('../controllers/propertyController');
const verify = require('../middlewares/authMiddleware');

router.post('/create', verify, ctrl.createProperty);
router.get('/',            ctrl.getProperties);
router.get('/:id',         ctrl.getPropertyById);
router.put('/:id', verify, ctrl.updateProperty);
router.delete('/:id',verify, ctrl.deleteProperty);

module.exports = router;
