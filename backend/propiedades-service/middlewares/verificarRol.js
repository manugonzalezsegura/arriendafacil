const { UsuarioRol, Rol } = require('../shared-models');

module.exports = function verificarRol(rolesPermitidos) {
  return async (req, res, next) => {
    try {
      const id_usuario = req.user.id_usuario;

      const roles = await UsuarioRol.findAll({
        where: { id_usuario },
        include: { model: Rol, attributes: ['nombre'] }
      });

      const nombresRoles = roles.map(r => r.Rol.nombre);
      const tienePermiso = rolesPermitidos.some(r => nombresRoles.includes(r));

      if (!tienePermiso)
        return res.status(403).json({ error: 'No tienes permiso' });

      next();
    } catch (err) {
      console.error('❌ Error en verificarRol:', err);
      return res.status(500).json({ error: 'Error al verificar rol' });
    }
  };
};
