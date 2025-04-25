// /backend/pay-service/config/env.js
require('dotenv').config();

module.exports = {
  port:  process.env.PORT_PAYMENT,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  tokenExpiration: process.env.TOKEN_EXPIRATION,
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
  rabbitUrl:         process.env.RABBITMQ_URL,
  db: {
    name: process.env.DB_NAME_PAYMENT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST
  }
};
