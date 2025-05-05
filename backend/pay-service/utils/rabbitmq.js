// /backend/payment-service/utils/rabbitmq.js
const amqp = require('amqplib');
const {rabbit} = require('../config/env');//importo submodulo
const rabbiturl = rabbit.url;  //desestructuro para acceder a sus valores 

let channel;

async function initRabbit(retries = 5) {
    while (retries > 0) {
      try {
        console.log(`🔌 Coop Service: conectando RabbitMQ en ${rabbiturl}`);
        const conn = await amqp.connect(rabbiturl);
        channel    = await conn.createChannel();
        console.log('✅ Cooperativa Service: RabbitMQ conectado');
        return;
      } catch (err) {
        console.error('❌ Coop Service: error conectando RabbitMQ:', err.message);
        retries--;
        await new Promise(r => setTimeout(r, 3000));
      }
    }
    throw new Error('Coop Service: imposible conectar RabbitMQ');
  }



async function subscribe(queueName, onMessage) {
  if (!channel) throw new Error('Coop Service: channel no inicializado');

  await channel.assertExchange(queueName, 'fanout', { durable: true });
  const q = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(q.queue, queueName, '');
  channel.consume(q.queue, msg => {
    const data = JSON.parse(msg.content.toString());
    onMessage(data);
    channel.ack(msg);
  });
}


module.exports ={initRabbit,subscribe};