// /backend/payment-service/server.js
require('dotenv').config({ path: '../../.env' });  
const express = require('express');
const cors    = require('cors');

// 2️ Utilizo los helpers de Node para depurar rutas y archivos
const fs = require('fs');
const path = require('path');



const { sequelize } = require('./config/DB');
const models = require('./models');



const paymentRoutes = require('./routes/payment.routes');
const { ports } = require('./config/env');
//const {start: startUserEvents  } = require('./eventos/coopEvent')


// DEPURACIÓN: ¿de dónde arranco y qué hay en shared-models?
console.log('— auth-service __dirname:', __dirname);
console.log('— shared-models files:', fs.readdirSync(path.resolve(__dirname, './shared-models')));



const app = express();
app.use(cors());
app.use(express.json());

// 1) Sincroniza tu BD de payment-service
sequelize.sync({ force : false })
  .then(() => console.log('🔄 Payment DB sincronizada'))
  .catch(err => console.error('❌ Error DB Payment:', err));

// iniciamos rabbit
//startUserEvents().catch(err =>console.error('❌ Error en suscriptor coopEvents:', err));
// 3) Monta tus rutas de pago
app.use('/api/payments', paymentRoutes);

// 4) Inicia el servidor
app.listen(ports.pay, () => {
  console.log(`💳 Payment Service escuchando en http://localhost:${ports.pay}`);
});
