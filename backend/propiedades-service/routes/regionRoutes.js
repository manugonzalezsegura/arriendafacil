// backend\propiedades-service\routes\regionRoutes.js

const router = require('express').Router();

// Traer todas las regiones
router.get('/regiones', async (req, res) => {
  const { Region } = require('../models');
  const regiones = await Region.findAll({ order: [['nombre', 'ASC']] });
  res.json(regiones);
});

// Traer comunas por región
router.get('/comunas/:id_region', async (req, res) => {
  const { Comuna } = require('../models');
  const comunas = await Comuna.findAll({
    where: { id_region: req.params.id_region },
    order: [['nombre', 'ASC']]
  });
  res.json(comunas);
});

module.exports = router;
