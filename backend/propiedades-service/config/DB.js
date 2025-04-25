//     /backend/propiedades-service/config/DB.js
const { Sequelize } = require('sequelize')
const config =require('./env')

const sequelize = new Sequelize (

  config.db.name,
  config.db.user,
  config.db.pass,

  {host: config.db.host, port:config.db.port, dialect:'mysql', logging:console.log}

);
module.exports = { sequelize };