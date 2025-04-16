// backend/cooperative-service/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/DB');
const apiRoutes = require('./routes/apiRoutes');  // Archivo central que reúne todas las rutas del microservicio
const { PORT_GROUP } = process.env;  // Debe tener el valor 3002 en tu .env

const app = express();
app.use(cors());
app.use(express.json());

// Sincronizar las tablas del servicio (en desarrollo se puede usar { force: true } - en producción, usar sync() sin forzar)
sequelize.sync({ force: true })
  .then(() => console.log('🔄 Cooperativa DB sincronizada (force: true)'))
  .catch(err => console.error('❌ Error al sincronizar la DB de cooperativa:', err));

// Montar las rutas del API; aquí puedes elegir el prefijo que desees, por ejemplo '/api/cooperative'
app.use('/api/cooperative', apiRoutes);
app.use('/api', apiRoutes);
// Ruta de error para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT_GROUP, () => {
  console.log(`🏦 Cooperativa Service escuchando en http://localhost:${PORT_GROUP}`);
});
