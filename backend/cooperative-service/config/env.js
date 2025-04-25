// /backend/propiedades-service/config/env.js

require('dotenv').config();


module.exports = {

  // 2) Configuración de la base de datos
  
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT)||3306,
    name: process.env.DB_NAME_COOP,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    
  },
   // 3) Configuración de JWT (si lo usa tu servicio) pendiente de quitar si no lo uso

  jwt:{
    secret:process.env.JWT_SECRET,
    refreshSecret:process.env.JWT_REFRESH_SECRET,
    expiresIn:process.env.TOKEN_EXPIRATION,
    refreshIn:process.env.REFRESH_TOKEN_EXPIRATION,
  },
  
    // 4) Puerto en el que corre este microservicio

  ports:{
    prop: Number(process.env.PORT_GROUP)||3002,
  },

   // 5) Conexión a RabbitMQ (omite este bloque si tu servicio aún no lo usa)
  
   rabbit:{

    url:process.env.RABBITMQ_URL,

  },

};