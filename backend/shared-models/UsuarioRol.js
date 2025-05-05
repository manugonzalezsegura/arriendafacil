// UsuarioRol.js - fábrica de asociación Usuario ↔ Rol
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const Usuario = require('./Usuario')(sequelize);
  const Rol     = require('./Rol')(sequelize);

  const UsuarioRol = sequelize.define('UsuarioRol', {
    id_usuario: { type: DataTypes.INTEGER, primaryKey: true },
    id_rol:     { type: DataTypes.INTEGER, primaryKey: true },
    creado_en:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'UsuarioRol',
    timestamps: false
  });

  // Las asociaciones many-to-many se definen en index.js
  return UsuarioRol;
};