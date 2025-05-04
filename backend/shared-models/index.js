// backend/models/index.js
// ————————————————————————————————————————————————————————————————
// Este archivo importa todos tus modelos y declara aquí TODAS
// las asociaciones entre ellos. Luego, en server.js, sólo basta:
//   require('./models');
// para activar todas las relaciones.
// ————————————————————————————————————————————————————————————————


const sequelize = require('./config/DB');  


const Usuario           = require('./Usuario')(sequelize);
const Rol               = require('./Rol')(sequelize);
const UsuarioRol        = require('./UsuarioRol')(sequelize);
const PerfilInquilino   = require('./PerfilInquilino')(sequelize);
const Propiedad         = require('./Propiedad')(sequelize);
const Postulacion       = require('./Postulacion')(sequelize);
const IntentoPago       = require('./IntentoPago')(sequelize);
const Valoracion        = require('./Valoracion')(sequelize);
const SolicitudApoyo    = require('./SolicitudApoyo')(sequelize);
const ContribucionApoyo = require('./ContribucionApoyo')(sequelize);



// — 1) Usuarios ↔ Roles (muchos a muchos)
Usuario.belongsToMany(Rol,     { through: UsuarioRol, foreignKey: 'id_usuario' });
Rol    .belongsToMany(Usuario, { through: UsuarioRol, foreignKey: 'id_rol'     });

// — 2) Usuario → PerfilInquilino (uno a uno)
Usuario.hasOne(PerfilInquilino, { foreignKey: 'id_usuario' });
PerfilInquilino.belongsTo(Usuario,    { foreignKey: 'id_usuario' });

// — 3) Usuario → Propiedades (uno a muchos)
Usuario.hasMany(Propiedad, { foreignKey: 'id_usuario' });
Propiedad.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// — 4) Propiedad → Postulaciones (uno a muchos)
Propiedad.hasMany(Postulacion, { foreignKey: 'id_propiedad' });
Postulacion.belongsTo(Propiedad, { foreignKey: 'id_propiedad' });

// — 5) Usuario → Postulaciones (uno a muchos)
Usuario.hasMany(Postulacion, { foreignKey: 'id_usuario' });
Postulacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// — 6) Usuario → Intentos de Pago (uno a muchos)
Usuario.hasMany(IntentoPago, { foreignKey: 'id_usuario' });
IntentoPago.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// — 7) Usuario → Valoraciones (auto-relación)
Usuario.hasMany(Valoracion, { as: 'ValoracionesHechas',   foreignKey: 'id_autor'    });
Usuario.hasMany(Valoracion, { as: 'ValoracionesRecibidas',foreignKey: 'id_receptor' });
Valoracion.belongsTo(Usuario, { as: 'Autor',    foreignKey: 'id_autor'    });
Valoracion.belongsTo(Usuario, { as: 'Receptor', foreignKey: 'id_receptor' });

// — 8) SolicitudApoyo → Contribuciones (uno a muchos)
SolicitudApoyo.hasMany(ContribucionApoyo, { foreignKey: 'id_solicitud' });
ContribucionApoyo.belongsTo(SolicitudApoyo, { foreignKey: 'id_solicitud' });

// — 9) Usuario → Contribuciones (uno a muchos)
Usuario.hasMany(ContribucionApoyo, { foreignKey: 'id_usuario' });
ContribucionApoyo.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = {
  Usuario, Rol, UsuarioRol, PerfilInquilino,
  Propiedad, Postulacion,
  IntentoPago,
  Valoracion,
  SolicitudApoyo, ContribucionApoyo
};
