// /backend/profile-service/controllers/perfilController.js

const { PerfilInquilino } = require('../models');

/**
 * GET /api/perfil/:usuarioId
 */
exports.getPerfil = async (req, res) => {
  const id_usuario = req.user.id_usuario;

  try {
    const perfil = await PerfilInquilino.findByPk(id_usuario);

    if (!perfil) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    res.json(perfil);

  } catch (err) {
    console.error('❌ Error en getPerfil:', err);
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
};



exports.crearActualizarPerfil = async (req, res) => {
  const id_usuario = req.user.id_usuario; // viene del token
  const {
    sueldo,
    sueldo_pareja,
    dependientes,
    profesion,
    antiguedad_laboral,
    puntaje_credito
  } = req.body;

  try {
    let perfil = await PerfilInquilino.findByPk(id_usuario);

    if (perfil) {
      await perfil.update({
        sueldo,
        sueldo_pareja,
        dependientes,
        profesion,
        antiguedad_laboral,
        puntaje_credito
      });
      return res.json({ message: 'Perfil actualizado', perfil });
    
    } else {
      perfil = await PerfilInquilino.create({
        id_usuario,
        sueldo,
        sueldo_pareja,
        dependientes,
        profesion,
        antiguedad_laboral,
        puntaje_credito
      });
      return res.status(201).json({ message: 'Perfil creado', perfil });
    }

  } catch (error) {
    console.error('❌ Error en crearActualizarPerfil:', error);
    res.status(500).json({ message: 'Error al guardar el perfil', error: error.message });
  }
};


function generarPerfilInquilinoSchema() {
  return {
    title: 'Perfil Inquilino',
    type: 'object',
    properties: {
      sueldo:             { type: 'number' },
      sueldo_pareja:      { type: 'number' },
      dependientes:       { type: 'integer' },
      profesion:          { type: 'string' },
      antiguedad_laboral: { type: 'integer' },
      puntaje_credito:    { type: 'integer' }
    },
    required: ['sueldo', 'dependientes']
  };
}

exports.getPerfilInquilinoSchema = (req, res) => {
  const schema = generarPerfilInquilinoSchema();
  res.json(schema);
};