// /backend/auth-service/server.js

require('dotenv').config({ path: '../../.env' });
const express = require('express');
const cors    = require('cors');
const { sequelize } = require('./config/DB');
const authRoutes    = require('./routes/authRoutes');
const { port }      = require('./config/env');  // ahora port sí vendrá definido

const app = express();
app.use(cors());
app.use(express.json());

// Sincronizar todas las tablas de este servicio (modo desarrollo)
sequelize.sync({ force: true })
  .then(() => console.log('🔄 Auth DB sincronizada (force: true)'))
  .catch(err => console.error('❌ Error DB Auth:', err));

// Rutas de autenticación
app.use('/api', authRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`🛡️  Auth Service escuchando en http://localhost:${port}`);
});
