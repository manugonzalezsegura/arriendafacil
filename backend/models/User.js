//  /backend/models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');

const User = sequelize.define('User', {
  id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uid: { type: DataTypes.STRING, allowNull: false, unique: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefono: { type: DataTypes.STRING, allowNull: true },
  refreshToken: { type: DataTypes.STRING, allowNull: true } // Guardamos el refreshToken
}, { timestamps: true });

module.exports = User;