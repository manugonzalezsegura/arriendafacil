// backend\auth-service\controllers\rolController.js

const { Rol, UsuarioRol, Usuario } = require('../models');

exports.obtenerRoles = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const usuario = await Usuario.findByPk(id_usuario, {
      include: {
        model: Rol,
        through: { attributes: [] } // para no traer la tabla intermedia
      }
    });

    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    return res.json(usuario.Rols); // Sequelize pluraliza los modelos asociados
  } catch (error) {
    console.error('❌ Error al obtener roles:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
