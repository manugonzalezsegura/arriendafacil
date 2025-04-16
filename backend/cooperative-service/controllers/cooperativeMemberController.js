// /backend/cooperativa-service/controllers/cooperativeMemberController.js

const CooperativeMember = require('../models/CooperativeMember');

// Crear un miembro
exports.createMember = async (req, res) => {
  try {
    const { id_user, rol, estado } = req.body;
    const newMember = await CooperativeMember.create({ id_user, rol, estado });
    res.status(201).json({ message: 'Miembro creado', member: newMember });
  } catch (error) {
    console.error('Error creando miembro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todos los miembros
exports.getAllMembers = async (req, res) => {
  try {
    const members = await CooperativeMember.findAll();
    res.status(200).json(members);
  } catch (error) {
    console.error('Error obteniendo miembros:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un miembro por id
exports.getMemberById = async (req, res) => {
  try {
    const { id_member } = req.params;
    const member = await CooperativeMember.findByPk(id_member);
    if (!member) return res.status(404).json({ error: 'Miembro no encontrado' });
    res.status(200).json(member);
  } catch (error) {
    console.error('Error obteniendo miembro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un miembro
exports.updateMember = async (req, res) => {
  try {
    const { id_member } = req.params;
    const [updated] = await CooperativeMember.update(req.body, { where: { id_member } });
    if (!updated) return res.status(404).json({ error: 'Miembro no encontrado' });
    const updatedMember = await CooperativeMember.findByPk(id_member);
    res.status(200).json({ message: 'Miembro actualizado', member: updatedMember });
  } catch (error) {
    console.error('Error actualizando miembro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar (o soft delete) un miembro - Ejemplo: poner estado a "retirado"
exports.deleteMember = async (req, res) => {
  try {
    const { id_member } = req.params;
    const [updated] = await CooperativeMember.update({ estado: 'retirado' }, { where: { id_member } });
    if (!updated) return res.status(404).json({ error: 'Miembro no encontrado' });
    res.status(200).json({ message: 'Miembro marcado como retirado' });
  } catch (error) {
    console.error('Error eliminando miembro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
