// backend/cooperative-service/server.js


const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/DB');
const apiRoutes = require('./routes/apiRoutes');  // Archivo central que reúne todas las rutas del microservicio
const { ports } = require('./config/env');
const {start: startUserEvents  } = require('./eventos/coopEvent')



const app = express();
app.use(cors());
app.use(express.json());

// Sincronizar las tablas del servicio (en desarrollo se puede usar { force: true } - en producción, usar sync() sin forzar)
sequelize.sync({ force: false })
  .then(() => console.log('🔄 Cooperativa DB sincronizada (force: true)'))
  .catch(err => console.error('❌ Error al sincronizar la DB de cooperativa:', err));



  // 2) Inicia la suscripción a RabbitMQ
startUserEvents().catch(err =>
  console.error('❌ Error en suscriptor coopEvents:', err)
);

// Montar las rutas del API; aquí puedes elegir el prefijo que desees, por ejemplo '/api/cooperative'
app.use('/api/cooperative', apiRoutes);
app.use('/api', apiRoutes);

// Ruta de error para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

  // Devuelve al cliente todos los headers que te llegan
  app.get('/debug-headers', (req, res) => {res.json(req.headers)});

 


// Iniciar servidor
app.listen(ports.coop, () => {
  console.log(`🏦 Cooperativa Service escuchando en http://localhost:${ports.coop}`);
});
