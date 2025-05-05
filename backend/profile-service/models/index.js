// /backend/profile-service/models/index.js

// 1️⃣ Importa tu conexión local
const { sequelize } = require('../config/DB');

// 2️⃣ Importa la fábrica de modelos compartidos
const initModels = require('../shared-models');

// 3️⃣ Inicializa **una sola vez** los modelos + asociaciones
const models = initModels(sequelize);

// 4️⃣ Exporta ese objeto para usarlo en controladores, rutas, etc.
module.exports = models;