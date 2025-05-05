//  /backend/cooperativa-service/models/SupportContribution.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const SolicitudApoyo = require('./SolicitudApoyo');
const MiembroCooperativa = require('./ContribucionApoyo');

const ContribucionApoyo = sequelize.define('ContribucionApoyo', {
  id_contribucion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_solicitud: {
    type: DataTypes.INTEGER,
    references: {
      model: SolicitudApoyo,
      key: 'id_solicitud'
    }
  },
  id_donante: {
    type: DataTypes.INTEGER,
    references: {
      model: MiembroCooperativa,
      key: 'id_miembro'
    }
  },
  monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  fecha_contribucion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { tableName: 'ContribucionApoyo', timestamps: false });

module.exports = ContribucionApoyo;
