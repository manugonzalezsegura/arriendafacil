// /backend/cooperativa-service/models/SupportRequest.js

const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../config/DB'); 
const CooperativeMember = require('./CooperativeMember'); 

const SupportRequest = sequelize.define('SupportRequest', { 
  id_request: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
  id_solicitante: { type: DataTypes.INTEGER, allowNull: false, references: { model: CooperativeMember, key: 'id_member' } }, 
  monto_solicitado: { type: DataTypes.DECIMAL(10,2), allowNull: false }, 
  motivo: { type: DataTypes.STRING, allowNull: false }, 
  estado: { type: DataTypes.ENUM('pendiente','aceptada','rechazada'), defaultValue: 'pendiente' }, 
  fecha_solicitud: { type: DataTypes.DATE, defaultValue: DataTypes.NOW } 
}, { timestamps: true }); 
module.exports = SupportRequest;
