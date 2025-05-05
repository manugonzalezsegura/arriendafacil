// /backend/auth-service/config/firebaseAdmin

const admin = require('firebase-admin');
const path = require('path');

// 1️⃣ — Cargar el JSON de la cuenta de servicio
const serviceAccount = require(path.resolve(__dirname, '../firebase/serviceAccountKey.json'));

// 2️⃣ — Inicializar el SDK de Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 3️⃣ — Exportar para usar en controladores
module.exports = admin;
