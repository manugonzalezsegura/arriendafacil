//     /backend/propiedades-service/config/DB.js

const { Sequelize } = require('sequelize');
const { db } = require('./env');

const sequelize = new Sequelize(
  db.name, db.user, db.pass, {
    host: db.host,
    dialect: 'mysql',
    logging: false
  }
);

module.exports = { sequelize };
