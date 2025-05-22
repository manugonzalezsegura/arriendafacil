// Usuario.js - fábrica de modelo Usuario
// Recibe la instancia de Sequelize y define la tabla 'Usuario'
// /app/shared-models/index.js
// Este módulo exporta una función que define los modelos usando la instancia de Sequelize que tú le pasas

const HistorialArrendamiento = require('./HistorialArrendamiento');

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
  const Region            = require('./Region')(sequelize);
  const Comuna            = require('./Comuna')(sequelize)
  const PagoMensual = require('./PagoMensual')(sequelize);


  const HistorialArrendamiento = require('./HistorialArrendamiento')(sequelize);
  const PerfilArrendador = require('./PerfilArrendador')(sequelize);
  const ResultadoML = require ('./ResultadoML')(sequelize);
  const ImagenPropiedad = require('./ImagenPropiedad')(sequelize);

  // Relaciones entre modelos
  Usuario.belongsToMany(Rol,        { through: UsuarioRol, foreignKey: 'id_usuario' });
  Rol    .belongsToMany(Usuario,    { through: UsuarioRol, foreignKey: 'id_rol'     });
  UsuarioRol.belongsTo(Rol, { foreignKey: 'id_rol' });
  UsuarioRol.belongsTo(Usuario, { foreignKey: 'id_usuario' });

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

  Postulacion.hasMany(IntentoPago, { foreignKey: 'id_postulacion' });
  IntentoPago.belongsTo(Postulacion, { foreignKey: 'id_postulacion' });

  Usuario.hasMany(Valoracion,       { as: 'ValoracionesHechas',   foreignKey: 'id_autor'    });
  Usuario.hasMany(Valoracion,       { as: 'ValoracionesRecibidas',foreignKey: 'id_receptor'});
  Valoracion.belongsTo(Usuario,     { as: 'Autor',    foreignKey: 'id_autor'    });
  Valoracion.belongsTo(Usuario,     { as: 'Receptor', foreignKey: 'id_receptor' });

  

  // Relaciones entre Region y Comuna
  Region.hasMany(Comuna,   { foreignKey: 'id_region' });
  Comuna.belongsTo(Region, { foreignKey: 'id_region' });

  // Propiedad → Comuna
  Propiedad.belongsTo(Comuna, { foreignKey: 'id_comuna' });
  Comuna.hasMany(Propiedad,   { foreignKey: 'id_comuna' });

  // PerfilInquilino → Comuna
  PerfilInquilino.belongsTo(Comuna, { foreignKey: 'id_comuna' });
  Comuna.hasMany(PerfilInquilino,   { foreignKey: 'id_comuna' });

  PerfilInquilino.hasMany(Postulacion, { foreignKey: 'id_usuario' });
  Postulacion.belongsTo(PerfilInquilino, { foreignKey: 'id_usuario' });

  // Relación PagoMensual ↔ Postulacion
  Postulacion.hasMany(PagoMensual, { foreignKey: 'id_postulacion' });
  PagoMensual.belongsTo(Postulacion, { foreignKey: 'id_postulacion' });

    
  // Relación arrendador (dueño)
  Usuario.hasMany(HistorialArrendamiento, { foreignKey: 'id_arrendador', as: 'ArrendamientosComoDueño' });
  HistorialArrendamiento.belongsTo(Usuario, { foreignKey: 'id_arrendador', as: 'Arrendador' });

  // Relación inquilino
  Usuario.hasMany(HistorialArrendamiento, { foreignKey: 'id_inquilino', as: 'ArrendamientosComoInquilino' });
  HistorialArrendamiento.belongsTo(Usuario, { foreignKey: 'id_inquilino', as: 'Inquilino' });

  // Relación propiedad
  Propiedad.hasMany(HistorialArrendamiento, { foreignKey: 'id_propiedad' });
  HistorialArrendamiento.belongsTo(Propiedad, { foreignKey: 'id_propiedad' });
  // Devuelve todos los modelos definidos

  Propiedad.hasMany(ImagenPropiedad, { foreignKey: 'id_propiedad' });
  ImagenPropiedad.belongsTo(Propiedad, { foreignKey: 'id_propiedad' });

  return {
    Usuario,
    Rol,
    UsuarioRol,
    PerfilInquilino,
    Propiedad,
    Postulacion,
    IntentoPago,
    Valoracion,
    Comuna,
    Region,
    HistorialArrendamiento,
    PerfilArrendador,
    ResultadoML,
    PagoMensual,
    ImagenPropiedad
  };
};