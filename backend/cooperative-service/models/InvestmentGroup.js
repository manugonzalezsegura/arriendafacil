// /backend/cooperativa-service/models/InvestmentGroup.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const UserStub = require('./UserStub'); // Modelo de usuarios

const InvestmentGroup = sequelize.define('InvestmentGroup', {
  id_group: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING },
  estado: { type: DataTypes.ENUM('activo','inactivo'), defaultValue: 'activo'},
  id_admin: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: require('./CooperativeMember'),
      key: 'id_member'
    }
  }
}, { timestamps: true });

module.exports = InvestmentGroup;
