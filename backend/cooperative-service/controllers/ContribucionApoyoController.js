// /backend/cooperativa-service/controllers/supportContributionController.js
// /backend/cooperativa-service/controllers/contribucionApoyoController.js

const ContribucionApoyo = require('../models/ContribucionApoyo');

// Crear una contribución a una solicitud
exports.crearContribucion = async (req, res) => {
  try {
    const { id_solicitud, id_donante, monto } = req.body;
    const nuevaContrib = await ContribucionApoyo.create({ id_solicitud, id_donante, monto });
    res.status(201).json({ message: 'Contribución creada', contribucion: nuevaContrib });
  } catch (error) {
    console.error('Error creando contribución:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todas las contribuciones de una solicitud
exports.obtenerContribucionesPorSolicitud = async (req, res) => {
  try {
    const { id_solicitud } = req.params;
    const contribs = await ContribucionApoyo.findAll({ where: { id_solicitud } });
    res.status(200).json(contribs);
  } catch (error) {
    console.error('Error obteniendo contribuciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
