// /backend/payment-service/server.js
require('dotenv').config({ path: '../../.env' });  
const express = require('express');
const cors    = require('cors');
const { sequelize } = require('./config/DB');
const paymentRoutes = require('./routes/payment.routes');
const { port } = require('./config/env');
const { subscribeToUserEvents } = require('./utils/subscribers');

const app = express();
app.use(cors());
app.use(express.json());

// 1) Sincroniza tu BD de payment-service
sequelize.sync({ force: true })
  .then(() => console.log('🔄 Payment DB sincronizada (force: true)'))
  .catch(err => console.error('❌ Error DB Payment:', err));

// 2) Suscríbete al evento user.registered
subscribeToUserEvents()
  .then(() => console.log('✅ Subscripción a user.registered activa'))
  .catch(err => console.error('❌ Error suscripción RabbitMQ:', err));

// 3) Monta tus rutas de pago
app.use('/api/payments', paymentRoutes);

// 4) Inicia el servidor
app.listen(port, () => {
  console.log(`💳 Payment Service escuchando en http://localhost:${port}`);
});
