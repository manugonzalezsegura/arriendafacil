// /backend/cooperativa-service/controllers/supportRequestController.js

const SupportRequest = require('../models/SupportRequest');

// Crear una solicitud de apoyo
exports.createSupportRequest = async (req, res) => {
  try {
    const { id_solicitante, monto_solicitado, motivo, id_group } = req.body;
    const newRequest = await SupportRequest.create({ id_solicitante, monto_solicitado, motivo, id_group });
    res.status(201).json({ message: 'Solicitud de apoyo creada', request: newRequest });
  } catch (error) {
    console.error('Error creando solicitud de apoyo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todas las solicitudes
exports.getAllSupportRequests = async (req, res) => {
  try {
    const requests = await SupportRequest.findAll();
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error obteniendo solicitudes de apoyo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar el estado de una solicitud (aceptada/rechazada)
exports.updateSupportRequest = async (req, res) => {
  try {
    const { id_request } = req.params;
    const { estado } = req.body; // Estado: "aceptada" o "rechazada"
    const [updated] = await SupportRequest.update({ estado }, { where: { id_request } });
    if (!updated) return res.status(404).json({ error: 'Solicitud no encontrada' });
    const updatedRequest = await SupportRequest.findByPk(id_request);
    res.status(200).json({ message: 'Solicitud actualizada', request: updatedRequest });
  } catch (error) {
    console.error('Error actualizando solicitud de apoyo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
