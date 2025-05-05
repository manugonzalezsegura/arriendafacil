// /backend/profile-service/controllers/valoracionController.js

const { Valoracion } = require('../models');

/**
 * POST /api/valoraciones
 */
exports.createValoracion = async (req, res) => {
  const { id_autor, id_receptor, rol_receptor, puntuacion, comentario } = req.body;

  try {
    const val = await Valoracion.create({
      id_autor,
      id_receptor,
      rol_receptor,
      puntuacion,
      comentario
    });

    res.status(201).json(val);

  } catch (err) {
    console.error('❌ Error en createValoracion:', err);
    res.status(500).json({ error: 'Error al crear la valoración' });
  }
};

/**
 * GET /api/valoraciones/recibidas/:usuarioId
 */
exports.listRecibidas = async (req, res) => {
  const id_receptor = Number(req.params.usuarioId);

  try {
    const vals = await Valoracion.findAll({ where: { id_receptor } });
    res.json(vals);

  } catch (err) {
    console.error('❌ Error en listRecibidas:', err);
    res.status(500).json({ error: 'Error al obtener valoraciones recibidas' });
  }
};

/**
 * GET /api/valoraciones/hechas/:usuarioId
 */
exports.listHechas = async (req, res) => {
  const id_autor = Number(req.params.usuarioId);

  try {
    const vals = await Valoracion.findAll({ where: { id_autor } });
    res.json(vals);

  } catch (err) {
    console.error('❌ Error en listHechas:', err);
    res.status(500).json({ error: 'Error al obtener valoraciones hechas' });
  }
};
