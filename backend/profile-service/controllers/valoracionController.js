// backend/perfil-service/controllers/valoracionController.js
const { Valoracion } = require('../models');

/**
 * POST /api/valoraciones
 */
exports.createValoracion = async (req, res) => {
  const { id_autor, id_receptor, rol_receptor, puntuacion, comentario } = req.body;
  try {
    const val = await Valoracion.create({ id_autor, id_receptor, rol_receptor, puntuacion, comentario });
    res.status(201).json(val);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/valoraciones/recibidas/:usuarioId
 */
exports.listRecibidas = async (req, res) => {
  const id_receptor = Number(req.params.usuarioId);
  const vals = await Valoracion.findAll({ where: { id_receptor } });
  res.json(vals);
};

/**
 * GET /api/valoraciones/hechas/:usuarioId
 */
exports.listHechas = async (req, res) => {
  const id_autor = Number(req.params.usuarioId);
  const vals = await Valoracion.findAll({ where: { id_autor } });
  res.json(vals);
};
