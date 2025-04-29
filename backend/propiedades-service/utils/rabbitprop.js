// backend/propiedades-service/utils/rabbitprop.js

const amqp = require ('amqplib');
const {rabbit} = require('../config/env');//importo submodulo
const rabbiturl = rabbit.url;  //desestructuro para acceder a sus valores 

let channel;

async function initRabbit(retries = 5) {
    while (retries > 0) {
      try {
        console.log(`🔌 Properties: conectando RabbitMQ en ${rabbiturl}`);
        const conn = await amqp.connect(rabbiturl);
        channel    = await conn.createChannel();
        console.log('✅ Properties Service: RabbitMQ conectado');
        return;
      } catch (err) {
        console.error('❌ Properties: error conectando RabbitMQ:', err.message);
        retries--;
        await new Promise(r => setTimeout(r, 3000));
      }
    }
    throw new Error('Properties: imposible conectar a RabbitMQ');
  }

  async function subscribe(queueName, onMessage) {
    if (!channel) throw new Error('Properties: channel no inicializado');
  
    // 1) Asegura exchange
    await channel.assertExchange(queueName, 'fanout', { durable: true });
    // 2) Crea cola exclusiva
    const q = await channel.assertQueue('', { exclusive: true });
    // 3) Bindea
    await channel.bindQueue(q.queue, queueName, '');
    // 4) Consume
    channel.consume(q.queue, msg => {
      const data = JSON.parse(msg.content.toString());
      onMessage(data);
      channel.ack(msg);
    });
  }

  async function publish(queueName, msg) {
    if (!channel) throw new Error('Payment Service: channel no inicializado');
    // 1) Asegura el exchange tipo fanout
    await channel.assertExchange(queueName, 'fanout', { durable: true });
    // 2) Publica
    channel.publish(queueName, '', Buffer.from(JSON.stringify(msg)), {
      persistent: true
    });
  }
  

module.exports ={initRabbit,subscribe,publish};