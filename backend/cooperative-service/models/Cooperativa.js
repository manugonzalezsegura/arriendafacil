// /backend/cooperativa-service/models/InvestmentGroup.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const MiembroCooperativa = require('./PerfilMiembro');

const Cooperativa = sequelize.define('Cooperativa', {
  id_cooperativa: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING },
  estado: { type: DataTypes.ENUM('activo', 'inactivo'), defaultValue: 'activo' },
  id_admin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MiembroCooperativa,
      key: 'id_miembro'
    }
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { tableName: 'Cooperativa', timestamps: false });

module.exports = Cooperativa;
