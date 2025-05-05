// /backend/cooperativa-service/models/MiembroGrupo.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const Cooperativa = require('./Cooperativa');
const MiembroCooperativa = require('./PerfilMiembro');

const MembresiaCooperativa  = sequelize.define('MembresiaCooperativa', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_cooperativa: {
    type: DataTypes.INTEGER,
    references: {
      model: Cooperativa,
      key: 'id_cooperativa'
    }
  },
  id_miembro: {
    type: DataTypes.INTEGER,
    references: {
      model: MiembroCooperativa,
      key: 'id_miembro'
    }
  },
  estado: { type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'), defaultValue: 'pendiente' },
  fecha_solicitud: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { tableName: 'MiembroGrupo', timestamps: false });

module.exports = MembresiaCooperativa;
