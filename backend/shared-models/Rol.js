// /backend/auth-service/models/Rol.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');

const Rol = sequelize.define('Rol', {
  id_rol:      { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre:      { type: DataTypes.STRING, allowNull: false, unique: true },
  descripcion: { type: DataTypes.TEXT },
}, {
  tableName: 'Rol', timestamps: false
});

module.exports = Rol;
