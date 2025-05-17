// /backend/propiedades-service/server.js

require('dotenv').config();
const express = require('express');
const cors    = require('cors');

//para ver rutas de archivos
const fs      = require('fs');
const path    = require('path');

// 1️⃣ Conexión Sequelize local
const { sequelize } = require('./config/DB');

// 2️⃣ Monta y configura los modelos **una sola vez**
const models        = require('./models');

// 3️⃣ Rutas y middleware
const regionRoutes = require('./routes/regionRoutes')
const propertyRoutes = require('./routes/propertyRoutes');
const userStubRoutes = require('./routes/userStubRoutes');
const postulacionRoutes = require('./routes/postulacionRoutes');

const { ports }      = require('./config/env');
const { start: startUserEvents } = require('./eventos/userEvents');

const app = express();
app.use(cors());
app.use(express.json());

// 4️⃣ Sincroniza tablas (dev)
sequelize.sync({ force: false })
  .then(() => console.log('🔄 Properties DB sincronizada'))
  .catch(err => console.error('❌ Error DB Properties:', err));

// 5️⃣ RabbitMQ subscriber (si lo usas)
//startUserEvents().catch(err =>
 // console.error('❌ Error en suscriptor userEvents:', err));

 console.log('🔑 JWT Secret (auth-service):', process.env.JWT_SECRET);

// 6️⃣ Debug de shared-models
console.log('— shared-models files:', fs.readdirSync(path.resolve(__dirname, './shared-models')));

// 7️⃣ Monta tus rutas
//app.use('/api',       userStubRoutes);
app.use('/api/propiedad', propertyRoutes);
app.use('/api/ubicacion', regionRoutes);
app.use('/postulaciones', postulacionRoutes);

// 8️⃣ Ruta debug
app.get('/debug-headers', (req, res) => res.json(req.headers));

// 9️⃣ Arranca servidor
app.listen(ports.prop, () => {
  console.log(`🏠 Properties Service escuchando en http://localhost:${ports.prop}`);
});
