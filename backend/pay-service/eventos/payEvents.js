// /backend/pay-service/eventos/payEvents.js

const { initRabbit, subscribe } = require('../utils/rabbitCoop');
const { upsertUserStub }        = require('../controllers/userStubController');

/**
 * start()
 * — Inicializa RabbitMQ y se suscribe al evento `user.registered`.
 */
async function start() {
  await initRabbit();
  await subscribe('user.registered', upsertUserStub);
  console.log('🔔 Suscrito al evento user.registered');
}

module.exports = { start };
