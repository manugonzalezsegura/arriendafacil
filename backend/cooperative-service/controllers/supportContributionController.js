// /backend/cooperativa-service/controllers/supportContributionController.js

const SupportContribution = require('../models/SupportContribution');

// Crear una contribución a una solicitud
exports.createSupportContribution = async (req, res) => {
  try {
    const { id_request, id_donante, monto } = req.body;
    const newContribution = await SupportContribution.create({ id_request, id_donante, monto });
    res.status(201).json({ message: 'Contribución creada', contribution: newContribution });
  } catch (error) {
    console.error('Error creando contribución:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todas las contribuciones para una solicitud específica
exports.getContributionsByRequest = async (req, res) => {
  try {
    const { id_request } = req.params;
    const contributions = await SupportContribution.findAll({ where: { id_request } });
    res.status(200).json(contributions);
  } catch (error) {
    console.error('Error obteniendo contribuciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
