//   /backend/propiedades-service/controllers/userStubcontrollers.js:

//const UserStub = require('../models/UserStub');


async function upsertUserStub({ id_user, uid }) {
  if (!id_user || !uid) {
    throw new Error('Faltan datos obligatorios: id_user y uid');
  }
  await UserStub.upsert({ id_user, uid });
  console.log(`📥 UserStub upsert: ${id_user} / ${uid}`);
}


async function syncUserStub(req, res) {
  try {
    await upsertUserStub(req.body);
    res.status(200).json({ message: 'UserStub sincronizado' });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
}



module.exports = { syncUserStub, upsertUserStub };



