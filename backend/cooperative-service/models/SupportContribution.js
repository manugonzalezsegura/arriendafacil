//  /backend/cooperativa-service/models/SupportContribution.js

const CooperativeMember = require('./CooperativeMember');
const SupportRequest = require('./SupportRequest'); 
const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../config/DB'); 


const SupportContribution = sequelize.define('SupportContribution', { 
  id_contribution: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
  id_request: { type: DataTypes.INTEGER, allowNull: false, references: { model: SupportRequest, key: 'id_request' } }, 
  id_donante: { type: DataTypes.INTEGER, allowNull: false ,references: { model: CooperativeMember, key: 'id_member' }}, 
  monto: { type: DataTypes.DECIMAL(10,2), allowNull: false }, 
  fecha_contrib: { type: DataTypes.DATE, defaultValue: DataTypes.NOW } 
}, { timestamps: true }); 
module.exports = SupportContribution;
