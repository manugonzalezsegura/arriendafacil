/*/ /backend/payment-service/models/UserStub.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');

const UserStub = sequelize.define('UserStub', {
  id_user: {type: DataTypes.INTEGER,primaryKey: true},
  nombre: {type: DataTypes.STRING,allowNull: false}}, {
timestamps: false
});

module.exports = UserStub;
*/