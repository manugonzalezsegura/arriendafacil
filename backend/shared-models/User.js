//  /backend/auth-service/models/User.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');

const User = sequelize.define('User', {
  id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uid:      { type: DataTypes.STRING, allowNull: false, unique: true },
  nombre:   { type: DataTypes.STRING, allowNull: false },
  email:    { type: DataTypes.STRING, allowNull: false, unique: true },
  telefono: { type: DataTypes.STRING },
  refreshToken: { type: DataTypes.STRING }
}, { timestamps: true });

module.exports = User;

//investigar posibilidad de autogenerar la vista 
