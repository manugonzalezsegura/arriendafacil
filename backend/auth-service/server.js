// /backend/auth-service/server.js

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { sequelize } = require('./shared-models');
const authRoutes    = require('./routes/authRoutes');
const { initRabbit } = require('./utils/rabbitmq');
const { ports }      = require('./config/env');  // ahora port sí vendrá definido

// 2) DEPURACIÓN: ¿de dónde arranco y qué hay en shared-models?
console.log('— auth-service __dirname:', __dirname);
console.log('— shared-models files:', fs.readdirSync(path.resolve(__dirname, '../shared-models')));

// 3) Importo TODOS los modelos y relaciones definidas en shared-models/index.js
require('./shared-models');

const app = express();
app.use(cors());
app.use(express.json());

// Sincronizar todas las tablas de este servicio (modo desarrollo)
sequelize.sync({ force: true })
  .then(() => console.log('🔄 Auth DB sincronizada (force: true)'))
  .catch(err => console.error('❌ Error DB Auth:', err));


  initRabbit().catch(err => {
    console.error('❌ Auth Service: no pude conectar RabbitMQ', err);
    process.exit(1);
  });


// Rutas de autenticación
app.use('/api', authRoutes);

  // Devuelve al cliente todos los headers que te llegan
app.get('/debug-headers', (req, res) => {res.json(req.headers)});

// Iniciar servidor
app.listen(ports.auth, () => {
  console.log(`🛡️  Auth Service escuchando en http://localhost:${ports.auth}`);
});
