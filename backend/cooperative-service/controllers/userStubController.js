//   /backend/coperative-service/controllers/userStubcontrollers.js:

// /backend/cooperativa-service/controllers/userStubController.js

const Usuario = require('../models/UserStub');

// Upsert de la tabla Usuario
async function upsertUsuario({ id_usuario, uid }) {
  if (!id_usuario || !uid) {
    throw new Error('Faltan datos obligatorios: id_usuario y uid');
  }
  await Usuario.upsert({ id_usuario, uid });
  console.log(`📥 Usuario upsert: ${id_usuario} / ${uid}`);
}

exports.syncUsuario = async (req, res) => {
  try {
    await upsertUsuario(req.body);
    res.status(200).json({ message: 'Usuario sincronizado' });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};
