//  /backend/cooperativa-service/controllers/groupMemberController.js

const InvestmentGroup = require('../models/InvestmentGroup');

// Crear un grupo de inversión (se asume que id_admin proviene de un miembro activo)
exports.createGroup = async (req, res) => {
  try {
    const { nombre, descripcion, id_admin } = req.body;
    const newGroup = await InvestmentGroup.create({ nombre, descripcion, id_admin });
    res.status(201).json({ message: 'Grupo creado', group: newGroup });
  } catch (error) {
    console.error('Error creando grupo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todos los grupos
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await InvestmentGroup.findAll();
    res.status(200).json(groups);
  } catch (error) {
    console.error('Error obteniendo grupos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un grupo por id
exports.getGroupById = async (req, res) => {
  try {
    const { id_group } = req.params;
    const group = await InvestmentGroup.findByPk(id_group);
    if (!group) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.status(200).json(group);
  } catch (error) {
    console.error('Error obteniendo grupo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un grupo (por ejemplo, cambiar nombre, descripción)
exports.updateGroup = async (req, res) => {
  try {
    const { id_group } = req.params;
    const [updated] = await InvestmentGroup.update(req.body, { where: { id_group } });
    if (!updated) return res.status(404).json({ error: 'Grupo no encontrado' });
    const updatedGroup = await InvestmentGroup.findByPk(id_group);
    res.status(200).json({ message: 'Grupo actualizado', group: updatedGroup });
  } catch (error) {
    console.error('Error actualizando grupo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Soft delete: Marcar grupo como "inactivo"
exports.deleteGroup = async (req, res) => {
  try {
    const { id_group } = req.params;
    const [updated] = await InvestmentGroup.update({ estado: 'inactivo' }, { where: { id_group } });
    if (!updated) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.status(200).json({ message: 'Grupo marcado como inactivo' });
  } catch (error) {
    console.error('Error eliminando grupo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
