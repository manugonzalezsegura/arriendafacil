// backend/perfil-service/controllers/perfilController.js
const { PerfilInquilino } = require('../models');

/**
 * GET /api/perfil/:usuarioId
 */
exports.getPerfil = async (req, res) => {
  const id_usuario = Number(req.params.usuarioId);
  try {
    const perfil = await PerfilInquilino.findByPk(id_usuario);
    if (!perfil) return res.status(404).json({ message: 'Perfil no encontrado' });
    res.json(perfil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /api/perfil/:usuarioId
 */
exports.updatePerfil = async (req, res) => {
  const id_usuario = Number(req.params.usuarioId);
  const { sueldo, dependientes, puntaje_credito } = req.body;
  try {
    let perfil = await PerfilInquilino.findByPk(id_usuario);
    if (!perfil) {
      perfil = await PerfilInquilino.create({ id_usuario, sueldo, dependientes, puntaje_credito });
    } else {
      await perfil.update({ sueldo, dependientes, puntaje_credito });
    }
    res.json({ message: 'Perfil guardado', perfil });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
