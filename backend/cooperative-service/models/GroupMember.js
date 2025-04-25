// /backend/cooperativa-service/models/GroupMember.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const InvestmentGroup = require('./InvestmentGroup');
const CooperativeMember = require('./CooperativeMember');

const GroupMember = sequelize.define('GroupMember', {
  id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
  id_group: {type: DataTypes.INTEGER,allowNull: false,references: { model: InvestmentGroup, key: 'id_group' }},
  id_member: {type: DataTypes.INTEGER, allowNull: false,references: { model: CooperativeMember, key: 'id_member' }},
  estado: {type: DataTypes.ENUM('pendiente','aprobado','rechazado'),
    defaultValue: 'pendiente'},
  fecha_solicitud: {type: DataTypes.DATE,defaultValue: DataTypes.NOW}
}, { timestamps: true });

module.exports = GroupMember;
