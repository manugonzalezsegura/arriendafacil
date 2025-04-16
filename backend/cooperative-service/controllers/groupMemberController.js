// /backend/cooperativa-service/controllers/groupMemberController.js

const GroupMember = require('../models/GroupMember');

// Un miembro solicita unirse a un grupo
exports.requestJoinGroup = async (req, res) => {
  try {
    const { id_group, id_member } = req.body;

    if (!id_group || !id_member) {
      return res.status(400).json({ error: 'Faltan id_group o id_member' });
    }

    const newRequest = await GroupMember.create({ id_group, id_member });

    res.status(201).json({
      message: 'Solicitud de ingreso creada',
      request: newRequest
    });
  } catch (error) {
    console.error('Error creando solicitud de ingreso:', error.message, error.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Obtener todas las solicitudes de un grupo (o según filtros)
exports.getGroupRequests = async (req, res) => {
  try {
    const { id_group } = req.params;
    const requests = await GroupMember.findAll({ where: { id_group } });
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error obteniendo solicitudes del grupo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Aprobar o rechazar una solicitud
exports.updateGroupRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body; // "aprobado" o "rechazado"
    const [updated] = await GroupMember.update({ estado }, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Solicitud no encontrada' });
    const updatedRequest = await GroupMember.findByPk(id);
    res.status(200).json({ message: 'Solicitud actualizada', request: updatedRequest });
  } catch (error) {
    console.error('Error actualizando solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
