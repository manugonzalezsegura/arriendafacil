// /backend/auth-service/models/UsuarioRol.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const Usuario = require('./Usuario');
const Rol     = require('./Rol');

const UsuarioRol = sequelize.define('UsuarioRol', {
  id_usuario: { type: DataTypes.INTEGER, primaryKey: true, references: { model: Usuario, key: 'id_usuario' } },
  id_rol:     { type: DataTypes.INTEGER, primaryKey: true, references: { model: Rol,     key: 'id_rol'     } },
  creado_en:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'UsuarioRol', timestamps: false
});

Usuario.belongsToMany(Rol,     { through: UsuarioRol, foreignKey: 'id_usuario' });
Rol    .belongsToMany(Usuario, { through: UsuarioRol, foreignKey: 'id_rol'     });

module.exports = UsuarioRol;
