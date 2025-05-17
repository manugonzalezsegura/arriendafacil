// backend/perfil-service/middlewares/verificarRol.js
const models = require('../models'); // Esto sí ya está inicializado con sequelize
const { UsuarioRol, Rol } = models;

module.exports = function verificarRol(rolesPermitidos) {
  return async (req, res, next) => {
    try {
      console.log('🔐 Entrando a middleware verificarRol');
      console.log('📥 req.user:', req.user);

      if (!req.user || !req.user.id_usuario) {
        console.warn('⚠️ No hay usuario autenticado en req.user');
        return res.status(401).json({ error: 'No autenticado' });
      }

      const id_usuario = req.user.id_usuario;
      console.log('🔎 Buscando roles para id_usuario:', id_usuario);

      const roles = await UsuarioRol.findAll({
        where: { id_usuario },
        include: {
          model: Rol,
          attributes: ['nombre']
        }
      });

      console.log('✅ Roles encontrados:', roles.map(r => r.Rol?.nombre));

      const nombresRoles = roles.map(r => r.Rol?.nombre);
      const tienePermiso = rolesPermitidos.some(r => nombresRoles.includes(r));

      if (!tienePermiso) {
        console.warn('🚫 Usuario no tiene rol permitido:', nombresRoles);
        return res.status(403).json({ error: 'No tienes permiso' });
      }

      console.log('✅ Usuario autorizado con rol válido');
      next();
    } catch (err) {
      console.error('❌ Error en verificarRol:', err.message);
      console.error(err.stack);
      return res.status(500).json({ error: 'Error al verificar rol', detalle: err.message });
    }
  };
};
