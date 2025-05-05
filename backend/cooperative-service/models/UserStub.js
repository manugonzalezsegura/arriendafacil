//  /backend/cooperativa-service/models/UserStub.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');

const Usuario = sequelize.define('Usuario', {
  id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uid: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'Usuario', timestamps: false });

module.exports = Usuario;