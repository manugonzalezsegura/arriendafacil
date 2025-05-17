// /backend/auth-service/server.js
// 1️⃣ Cargo las variables de entorno de este servicio (puertos, BD, JWT, etc.)
require('dotenv').config();
const express = require('express');
const cors    = require('cors');

// 2️ Utilizo los helpers de Node para depurar rutas y archivos
const fs = require('fs');
const path = require('path');

// 3️ Importo la instancia de Sequelize que definí en ./config/DB.js
//    — Esta conexión usa DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT de este servicio

const { sequelize } = require('./config/DB');
const models        = require('./models');  // ← lee /models/index.js y corre initModels

// 4️ Importo la función que carga todos los modelos y relaciones desde shared-models
//    — No importa .env, solo recibe la instancia Sequelize.
//    — Devolución opcional de los modelos si quieres usarlos directamente.



const rolRoutes = require('./routes/rolRoutes');
const authRoutes    = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { initRabbit } = require('./utils/rabbitmq');
const { ports }      = require('./config/env');  // ahora port sí vendrá definido






// DEPURACIÓN: ¿de dónde arranco y qué hay en shared-models?
console.log('— auth-service __dirname:', __dirname);
console.log('— shared-models files:', fs.readdirSync(path.resolve(__dirname, './shared-models')));
console.log('🔑 JWT Secret (auth-service):', process.env.JWT_SECRET);

// 3) Importo TODOS los modelos y relaciones definidas en shared-models/index.js


//require('./shared-models');

const app = express();
app.use(cors());
app.use(express.json());

// Sincronizar todas las tablas de este servicio (modo desarrollo)  alter: true  
sequelize.sync({ alter: true  })
  .then(() => {
    console.log('✅ Tablas sincronizadas correctamente');
    
    app.listen(ports.auth, () => {
      console.log(`🛡️  Auth Service escuchando en http://localhost:${ports.auth}`);
    });


  })
  .catch(error => {
    console.error('❌ Error al sincronizar tablas:', error);
  });



  initRabbit().catch(err => {
    console.error('❌ Auth Service: no pude conectar RabbitMQ', err);
    process.exit(1);
  });


// Rutas de autenticación
app.use('/api', authRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/admin', adminRoutes); 


  // Devuelve al cliente todos los headers que te llegan
app.get('/debug-headers', (req, res) => {res.json(req.headers)});

// Iniciar servidor

