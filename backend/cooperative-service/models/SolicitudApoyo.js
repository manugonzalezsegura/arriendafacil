// /backend/cooperativa-service/models/SolicitudApoyo.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const MiembroCooperativa = require('./PerfilMiembro');

const SolicitudApoyo = sequelize.define('SolicitudApoyo', {
  id_solicitud: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_solicitante: {
    type: DataTypes.INTEGER,
    references: {
      model: MiembroCooperativa,
      key: 'id_miembro'
    }
  },
  monto_solicitado: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  motivo: { type: DataTypes.STRING, allowNull: false },
  estado: { type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada'), defaultValue: 'pendiente' },
  fecha_solicitud: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { tableName: 'SolicitudApoyo', timestamps: false });

module.exports = SolicitudApoyo;

