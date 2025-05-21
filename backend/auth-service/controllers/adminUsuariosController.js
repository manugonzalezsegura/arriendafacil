// /backend/auth-service/controllers/adminUsuariosController.js
const { Usuario } = require('../models');

// GET /admin/usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    console.log("📥 [ADMIN] getAllUsuarios llamado");
    const usuarios = await Usuario.findAll({
      attributes: ['id_usuario', 'nombre', 'email', 'telefono', 'esta_activo', 'creado_en'],
      order: [['id_usuario', 'ASC' ]]
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


exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuario.update(datosActualizados);
    res.json({ message: 'Usuario actualizado exitosamente', usuario });
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};


exports.crearUsuarioAdmin = async (req, res) => {
  try {
    const { nombre, email, telefono, password } = req.body;

    const yaExiste = await Usuario.findOne({ where: { email } });
    if (yaExiste) return res.status(400).json({ error: 'Email ya registrado' });

    const nuevoUsuario = await Usuario.create({ nombre, email, telefono, password });
    
    // Asignar rol admin automáticamente
    const adminRol = await Rol.findOne({ where: { nombre: 'admin' } });
    await UsuarioRol.create({ id_usuario: nuevoUsuario.id_usuario, id_rol: adminRol.id_rol });

    res.json({ message: 'Usuario admin creado correctamente' });
  } catch (err) {
    console.error('❌ Error creando usuario admin:', err);
    res.status(500).json({ error: 'Error al crear usuario admin' });
  }
};


// 🧱 FORM SCHEMA PARA FRONT
function generarFormSchema() {
  return {
    title: 'Usuario',
    type: 'object',
    properties: {
      nombre:   { type: 'string' },
      email:    { type: 'string', format: 'email' },
      telefono: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['nombre', 'email', 'password']
  };
}

exports.getRegisterFormSchema = (req, res) => {
  console.log('📤 Enviando schema de formulario de registro');
  const schema = generarFormSchema();
  res.json(schema);
};
