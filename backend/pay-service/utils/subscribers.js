// /backend/payment-service/utils/subscribers.js
const amqp    = require('amqplib');
const UserStub = require('../models/UserStub');
const { rabbitUrl } = require('../config/env');

async function subscribeToUserEvents() {
  const conn    = await amqp.connect(rabbitUrl);
  const channel = await conn.createChannel();
  await channel.assertQueue('user.registered', { durable: true });

  channel.consume('user.registered', async msg => {
    const { id_user, nombre, uid } = JSON.parse(msg.content.toString());
    await UserStub.upsert({ id_user, nombre, uid }); // inserta o actualiza
    channel.ack(msg);
  });
}

module.exports = { subscribeToUserEvents };

