// utils/rabbit.js
const amqp = require('amqplib');
const {rabbit} = require('../config/env');//importo submodulo
const rabbiturl = rabbit.url;  //desestructuro para acceder a sus valores 

let channel = null;

/**
 * initRabbit(): abre UNA vez la conexión y canal.
 */
async function initRabbit() {
  const conn = await amqp.connect(rabbiturl);
  channel    = await conn.createChannel();
  console.log('✅ Auth Service: RabbitMQ conectado');
}

/**
 * publish(queue, msg): publica en la cola indicada.
 */
async function publish(queue, msg) {
  if (!channel) throw new Error('RabbitMQ channel no inicializado');
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), { persistent: true });
}

module.exports = { initRabbit, publish };
