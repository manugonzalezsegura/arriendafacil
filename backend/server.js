require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/DB');
const authRoutes = require('./routes/authRoutes');
const { port } = require('./config/env');

const app = express();
app.use(cors());
app.use(express.json());

// Sincronizar base de datos
sequelize.sync({ force: true })
  .then(() => {
    console.log('Tablas sincronizadas y recreadas exitosamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });

// Rutas
app.use('/api', authRoutes);

app.use('/api/property', propertyRoutes);

// Iniciar servidor
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
