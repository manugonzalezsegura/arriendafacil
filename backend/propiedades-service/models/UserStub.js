// /backend/propiedades-service/models/UserStub.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');

const UserStub = sequelize.define('User', {
  id_user: { type: DataTypes.INTEGER, primaryKey: true },
  uid:     { type: DataTypes.STRING }
}, { timestamps: false });

module.exports = UserStub;
