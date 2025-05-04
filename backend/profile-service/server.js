// backend/perfil-service/server.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { sequelize } = require('./config/DB');
const { perfil: port } = require('./config/env').ports;

// 1) Activar todas las asociaciones de modelos
require('./models');

// 2) Importar rutas
const perfilRoutes    = require('./routes/perfilRoutes');
const valoracionRoutes= require('./routes/valoracionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// 3) Sincronizar tablas (en dev force: true; en prod, ¡no!)
sequelize.sync({ force: true })
  .then(() => console.log('🔄 Perfil DB sincronizada'))
  .catch(err => console.error('❌ Error DB Perfil:', err));

// 4) Montar rutas bajo /api
app.use('/api/perfil', perfilRoutes);
app.use('/api/valoraciones', valoracionRoutes);

// 5) Debug headers
app.get('/debug-headers', (req, res) => res.json(req.headers));

// 6) Levantar servidor
app.listen(port, () => {
  console.log(`🛡️ Perfil Service escuchando en http://localhost:${port}`);
});
