// /backend/cooperativa-service/controllers/MembresiaCooperativaController.js

const MembresiaCooperativa  = require('../models/MembresiaCooperativa');

// Un miembro solicita unirse a un grupo
exports.solicitarIngresoGrupo = async (req, res) => {
  try {
    const { id_cooperativa, id_miembro } = req.body;
    if (!id_cooperativa || !id_miembro) {
      return res.status(400).json({ error: 'Faltan id_cooperativa o id_miembro' });
    }
    const nuevaSolicitud = await MembresiaCooperativa  .create({ id_cooperativa, id_miembro });
    res.status(201).json({ message: 'Solicitud de ingreso creada', solicitud: nuevaSolicitud });
  } catch (error) {
    console.error('Error creando solicitud de ingreso:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todas las solicitudes de un grupo
exports.obtenerSolicitudesPorGrupo = async (req, res) => {
  try {
    const { id_cooperativa } = req.params;
    const solicitudes = await MembresiaCooperativa  .findAll({ where: { id_cooperativa } });
    res.status(200).json(solicitudes);
  } catch (error) {
    console.error('Error obteniendo solicitudes del grupo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Aprobar o rechazar una solicitud
exports.actualizarEstadoSolicitud = async (req, res) => {
  try {
    const { id } = req.params;             // pk de MiembroGrupo
    const { estado } = req.body;           // "aprobado" o "rechazado"
    const [actualizado] = await MembresiaCooperativa  .update(
      { estado },
      { where: { id } }
    );
    if (!actualizado) return res.status(404).json({ error: 'Solicitud no encontrada' });
    const solicitudAct = await MembresiaCooperativa  .findByPk(id);
    res.status(200).json({ message: 'Solicitud actualizada', solicitud: solicitudAct });
  } catch (error) {
    console.error('Error actualizando solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
