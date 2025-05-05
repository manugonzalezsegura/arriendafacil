// /backend/pay-service/config/env.js
require('dotenv').config();

module.exports = {
  db: {
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    pass:     process.env.DB_PASS,
    name:     process.env.DB_NAME,
    port:     Number(process.env.DB_PORT)||3306
  },
  rabbit: {
    url: process.env.RABBITMQ_URL   // "amqp://user:pass@rabbitmq:5672"
  },
  transbank: {
    commerceCode: process.env.TBK_COMMERCE_CODE,
    apiKey:       process.env.TBK_API_KEY,
    integration:  process.env.TBK_INTEGRATION_TYPE || 'TEST', // "TEST" vs "LIVE"
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.TOKEN_EXPIRATION,
    refreshExpires: process.env.REFRESH_TOKEN_EXPIRATION
  },
  ports: {
    pay: Number(process.env.PORT_PAYMENT) || 3003
  }

};