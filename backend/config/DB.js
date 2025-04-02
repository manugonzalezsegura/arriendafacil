// backend/DB.js
const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize
const sequelize = new Sequelize('arriendofacil', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = { sequelize };