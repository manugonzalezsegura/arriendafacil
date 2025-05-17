// /backend/auth-service/controllers/adminUsuariosController.js
const { Usuario } = require('../models');

// GET /admin/usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    console.log("📥 [ADMIN] getAllUsuarios llamado");
    const usuarios = await Usuario.findAll({
      attributes: ['id_usuario', 'nombre', 'email', 'telefono', 'esta_activo', 'creado_en'],
      order: [['creado_en', 'DESC']]
    });

    console.log(`📊 Usuarios encontrados: ${usuarios.length}`);
    res.json(usuarios);
  } catch (err) {
    console.error("❌ Error en getAllUsuarios:", err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// 🗑️ DESACTIVAR USUARIO (SOFT DELETE)
exports.deleteUsuario = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`📥 [ADMIN] deleteUsuario llamado para ID: ${id}`);

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      console.warn(`⚠️ Usuario con ID ${id} no encontrado`);
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (!usuario.esta_activo) {
      console.warn(`⚠️ Usuario ID ${id} ya está desactivado`);
      return res.status(400).json({ message: 'Usuario ya estaba desactivado' });
    }

    usuario.esta_activo = false;
    await usuario.save();

    console.log(`✅ Usuario ID ${id} marcado como inactivo (soft delete)`);
    res.json({ message: 'Usuario desactivado correctamente' });
  } catch (err) {
    console.error("❌ Error en deleteUsuario:", err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'Error al desactivar usuario' });
  }
};