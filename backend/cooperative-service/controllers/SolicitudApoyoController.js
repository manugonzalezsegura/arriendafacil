// /backend/cooperativa-service/controllers/supportRequestController.js

// /backend/cooperativa-service/controllers/solicitudApoyoController.js

const SolicitudApoyo = require('../models/SolicitudApoyo');

// Crear una solicitud de apoyo
exports.crearSolicitudApoyo = async (req, res) => {
  try {
    const { id_solicitante, monto_solicitado, motivo } = req.body;
    const nuevaSol = await SolicitudApoyo.create({ id_solicitante, monto_solicitado, motivo });
    res.status(201).json({ message: 'Solicitud de apoyo creada', solicitud: nuevaSol });
  } catch (error) {
    console.error('Error creando solicitud de apoyo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todas las solicitudes de apoyo
exports.obtenerSolicitudesApoyo = async (req, res) => {
  try {
    const solicitudes = await SolicitudApoyo.findAll();
    res.status(200).json(solicitudes);
  } catch (error) {
    console.error('Error obteniendo solicitudes de apoyo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar estado de una solicitud de apoyo
exports.actualizarSolicitudApoyo = async (req, res) => {
  try {
    const { id_solicitud } = req.params;
    const { estado } = req.body; // "aceptada" o "rechazada"
    const [actualizado] = await SolicitudApoyo.update(
      { estado },
      { where: { id_solicitud } }
    );
    if (!actualizado) return res.status(404).json({ error: 'Solicitud no encontrada' });
    const solAct = await SolicitudApoyo.findByPk(id_solicitud);
    res.status(200).json({ message: 'Solicitud actualizada', solicitud: solAct });
  } catch (error) {
    console.error('Error actualizando solicitud de apoyo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
