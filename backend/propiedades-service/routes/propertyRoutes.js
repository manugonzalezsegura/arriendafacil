////backend/propiedades-service/routes/propertyRoutes.js

const router = require('express').Router();
const ctrl = require('../controllers/propertyController');
const verify = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/verificarRol');


router.post('/', verify, ctrl.createProperty);
router.get('/schema', verify, ctrl.getPropiedadSchema);
router.get('/',            ctrl.getProperties);
router.get('/mis-propiedades', verify, ctrl.getMisPropiedades);
router.get('/filtro',verify,ctrl.filtrarPropiedades);
router.put('/:id', verify, ctrl.updateProperty);
router.delete('/:id', verify, ctrl.deleteProperty);
router.get('/:id',         ctrl.getPropertyById);




module.exports = router; 


///router.get('/filtro', ctrl.filtrarPropiedades);