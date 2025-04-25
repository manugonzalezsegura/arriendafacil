//  propiedades-service/server.js
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/DB');
const propertyRoutes  = require('./routes/propertyRoutes');
const userStubRoutes = require('./routes/userStubRoutes');
const { ports } = require('./config/env');
const { initRabbit,subscribe } = require('./utils/rabbitprop');
const UserStub = require('./models/UserStub');
const {start: startUserEvents  } = require('./eventos/userEvents')
// env.js en propiedades-service debe leer PORT_PROP:
//module.exports.port = process.env.PORT_PROP;

const app = express();
app.use(cors());
app.use(express.json());

// Sincronizar todas las tablas de este servicio (modo desarrollo)
sequelize.sync({ force: true })
  .then(() => console.log('🔄 Properties DB sincronizada (force: true)'))
  .catch(err => console.error('❌ Error DB Properties:', err));




// 2) Inicia la suscripción a RabbitMQ
startUserEvents().catch(err =>
  console.error('❌ Error en suscriptor userEvents:', err)
);



// Importamos correctamente las rutas ANTES de usarlas
app.use('/api',userStubRoutes);
app.use('/api/properties', propertyRoutes);

  // Devuelve al cliente todos los headers que te llegan
app.get('/debug-headers', (req, res) => {res.json(req.headers)});

 
  
// Iniciar servidor
app.listen(ports.prop, () => {
  console.log(`🏠 Properties Service escuchando en http://localhost:${ports.prop}`);
});
