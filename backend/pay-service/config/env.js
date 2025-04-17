// /backend/payment-service/config/env.js
require('dotenv').config();  // lee .env en esta carpeta

module.exports = {
  port:       process.env.PORT_PAYMENT || 3003,  
  tbkCommerceCode: process.env.TBK_COMMERCE_CODE,  // p.ej. "597055555532"
  tbkApiKey:       process.env.TBK_API_KEY,        // la llave secreta de integración
  rabbitUrl:       process.env.RABBITMQ_URL,  // se podria retirar si me complica utilizar eventos 
};
