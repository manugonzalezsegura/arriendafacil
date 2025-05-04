// /backend/auth-service/config/DB.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  db.name, db.user, db.pass, {
    host: db.host,
    port: db.port,
    dialect: 'mysql',
    logging: console.log
  }
);

module.exports = { sequelize };
 