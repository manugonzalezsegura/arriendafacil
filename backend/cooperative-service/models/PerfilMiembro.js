// /backend/cooperativa-service/models/MiembroCooperativa.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const Usuario = require('./UserStub');

const PerfilMiembro  = sequelize.define('PerfilMiembro', {
  id_miembro: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_usuario: {
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: Usuario,
      key: 'id_usuario'
    }
  },
  rol: { type: DataTypes.ENUM('miembro', 'admin'), defaultValue: 'miembro' },
  fecha_union: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  estado: { type: DataTypes.ENUM('activo', 'suspendido', 'retirado'), defaultValue: 'activo' },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { tableName: 'PerfilMiembro', timestamps: false });

module.exports = PerfilMiembro;
