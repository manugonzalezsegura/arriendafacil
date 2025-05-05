// backend/auth-service/utils/rabbit.js
const amqp = require('amqplib');
const {rabbit} = require('../config/env');//importo submodulo
const rabbiturl = rabbit.url;  //desestructuro para acceder a sus valores 

let channel = null;

/**
 * initRabbit(): abre UNA vez la conexión y canal.
 */
async function initRabbit(retries = 5) {
  while (retries > 0) {
    try {
      console.log(`🔌 Auth Service: conectando a RabbitMQ en ${rabbiturl} (intentos restantes ${retries})`);
      const conn = await amqp.connect(rabbiturl);
      channel    = await conn.createChannel();
      console.log('✅ Auth Service: RabbitMQ conectado');
      return;
    } catch (err) {
      console.error('❌ Auth Service: error conectando RabbitMQ:', err.message);
      retries--;
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  throw new Error('Auth Service: imposible conectar a RabbitMQ');
}

/**
 * publish(queue, msg): publica en la cola indicada.
 */
async function publish(queueName, msg) {
  if (!channel) throw new Error('RabbitMQ channel no inicializado');
  
  await channel.assertExchange(queueName, 'fanout', { durable: true });
  
  channel.publish(queueName, '', Buffer.from(JSON.stringify(msg)), { persistent: true });
}

module.exports = { initRabbit, publish };
