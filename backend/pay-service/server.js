// /backend/payment-service/server.js
require('dotenv').config({ path: '../../.env' });  
const express = require('express');
const cors    = require('cors');
const { sequelize } = require('./config/DB');
const paymentRoutes = require('./routes/payment.routes');
const { ports } = require('./config/env');
const {start: startUserEvents  } = require('./eventos/coopEvent')

const app = express();
app.use(cors());
app.use(express.json());

// 1) Sincroniza tu BD de payment-service
sequelize.sync({ force: true })
  .then(() => console.log('🔄 Payment DB sincronizada (force: true)'))
  .catch(err => console.error('❌ Error DB Payment:', err));

// iniciamos rabbit
startUserEvents().catch(err =>
  console.error('❌ Error en suscriptor coopEvents:', err)
);
// 3) Monta tus rutas de pago
app.use('/api/payments', paymentRoutes);

// 4) Inicia el servidor
app.listen(ports.pay, () => {
  console.log(`💳 Payment Service escuchando en http://localhost:${ports.pay}`);
});
