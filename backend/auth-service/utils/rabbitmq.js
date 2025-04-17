// backend/auth-service/utils/rabbitmq.js
const amqp = require('amqplib');
const { rabbitUrl } = require('../config/env');

async function publish(queue, msg) {
  const conn = await amqp.connect(rabbitUrl);
  const ch   = await conn.createChannel();
  await ch.assertQueue(queue, { durable: true });
  ch.sendToQueue(queue,
    Buffer.from(JSON.stringify(msg)),
    { persistent: true }
  );
  await ch.close();
  await conn.close();
}

module.exports = { publish };
