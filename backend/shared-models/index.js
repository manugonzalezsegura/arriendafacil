// Usuario.js - fábrica de modelo Usuario
// Recibe la instancia de Sequelize y define la tabla 'Usuario'
// /app/shared-models/index.js
// Este módulo exporta una función que define los modelos usando la instancia de Sequelize que tú le pasas

module.exports = (sequelize) => {
  // Importación de fábricas de modelo
  const Usuario           = require('./Usuario')(sequelize);
  const Rol               = require('./Rol')(sequelize);
  const UsuarioRol        = require('./UsuarioRol')(sequelize);
  const PerfilInquilino   = require('./PerfilInquilino')(sequelize);
  const Propiedad         = require('./Propiedad')(sequelize);
  const Postulacion       = require('./Postulacion')(sequelize);
  const IntentoPago       = require('./IntentoPago')(sequelize);
  const Valoracion        = require('./Valoracion')(sequelize);

  // Relaciones entre modelos
  Usuario.belongsToMany(Rol,        { through: UsuarioRol, foreignKey: 'id_usuario' });
  Rol    .belongsToMany(Usuario,    { through: UsuarioRol, foreignKey: 'id_rol'     });

  Usuario.hasOne(PerfilInquilino,   { foreignKey: 'id_usuario' });
  PerfilInquilino.belongsTo(Usuario,{ foreignKey: 'id_usuario' });

  Usuario.hasMany(Propiedad,        { foreignKey: 'id_usuario' });
  Propiedad.belongsTo(Usuario,      { foreignKey: 'id_usuario' });

  Propiedad.hasMany(Postulacion,    { foreignKey: 'id_propiedad' });
  Postulacion.belongsTo(Propiedad,  { foreignKey: 'id_propiedad' });

  Usuario.hasMany(Postulacion,      { foreignKey: 'id_usuario' });
  Postulacion.belongsTo(Usuario,    { foreignKey: 'id_usuario' });

  Usuario.hasMany(IntentoPago,      { foreignKey: 'id_usuario' });
  IntentoPago.belongsTo(Usuario,    { foreignKey: 'id_usuario' });

  Usuario.hasMany(Valoracion,       { as: 'ValoracionesHechas',   foreignKey: 'id_autor'    });
  Usuario.hasMany(Valoracion,       { as: 'ValoracionesRecibidas',foreignKey: 'id_receptor'});
  Valoracion.belongsTo(Usuario,     { as: 'Autor',    foreignKey: 'id_autor'    });
  Valoracion.belongsTo(Usuario,     { as: 'Receptor', foreignKey: 'id_receptor' });

  // Devuelve todos los modelos definidos
  return {
    Usuario,
    Rol,
    UsuarioRol,
    PerfilInquilino,
    Propiedad,
    Postulacion,
    IntentoPago,
    Valoracion
  };
};