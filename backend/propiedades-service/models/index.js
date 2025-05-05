// /backend/propiedades-service/models/index.js

// 1️⃣ Importa tu conexión local
const { sequelize } = require('../config/DB');

// 2️⃣ Importa la fábrica compartida
const initModels    = require('../shared-models');

// 3️⃣ Inicializa UNA vez tus modelos + relaciones
const models        = initModels(sequelize);

// 4️⃣ Exporta el objeto de modelos
module.exports     = models;
