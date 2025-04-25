//  /backend/auth-service/eventos/rabbit.js
const amqp = require('amqplib');
const { rabbitUrl } = require('../config/env');

let channel;
async function connectRabbit() {
  const conn = await amqp.connect(rabbitUrl);
  channel = await conn.createChannel();
  console.log('✅ Conectado a RabbitMQ');
}
function getChannel() {
  return channel;
}
module.exports = { connectRabbit, getChannel };
