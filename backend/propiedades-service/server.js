//  propiedades-service/server.js



require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { sequelize }       = require('./config/DB');
const propertyRoutes      = require('./routes/propertyRoutes');
const { port, jwtSecret } = require('./config/env');

// env.js en propiedades-service debe leer PORT_PROP:
module.exports.port = process.env.PORT_PROP;

const app = express();
app.use(cors());
app.use(express.json());

// Sincronizar todas las tablas de este servicio (modo desarrollo)
sequelize.sync({ force: true })
  .then(() => console.log('🔄 Properties DB sincronizada (force: true)'))
  .catch(err => console.error('❌ Error DB Properties:', err));

// Importamos correctamente las rutas ANTES de usarlas
app.use('/api/properties', propertyRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`🏠 Properties Service escuchando en http://localhost:${port}`);
});
