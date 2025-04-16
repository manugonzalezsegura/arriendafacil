//   /backend/cooperative-service/routes/userStubRoutes.js:

const UserStub = require('../models/UserStub');

exports.syncUserStub = async (req, res) => {
  const { id_user, uid } = req.body;
  if (!id_user || !uid) {
    return res.status(400).json({ message: 'Faltan datos' });
  }
  try {
    let userStub = await UserStub.findByPk(id_user);
    if (!userStub) {
      userStub = await UserStub.create({ id_user, uid });
    } else {
      // En caso de que se necesite actualizar algún dato mínimo
      await userStub.update({ uid });
    }
    res.status(200).json({ message: 'UserStub sincronizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al sincronizar userstub', error });
  }
};
