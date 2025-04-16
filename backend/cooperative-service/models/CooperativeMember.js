// /backend/cooperativa-service/models/CooperativeMember.js

const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../config/DB'); 
const UserStub = require('./UserStub'); 

const CooperativeMember = sequelize.define('CooperativeMember', 
  { id_member: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
  id_user: { type: DataTypes.INTEGER, allowNull: false,unique:true, references: { model: UserStub, key: 'id_user' } }, 
  rol: { type: DataTypes.ENUM('miembro','admin'), defaultValue: 'miembro' }, 
  fecha_union: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, 
  estado: { type: DataTypes.ENUM('activo','suspendido','retirado'), defaultValue: 'activo' } 
}, { timestamps: true }); 
module.exports = CooperativeMember;