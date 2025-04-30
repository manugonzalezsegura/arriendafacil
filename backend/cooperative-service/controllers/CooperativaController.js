//  /backend/cooperativa-service/controllers/groupMemberController.js

const Cooperativa = require('../models/Cooperativa');

// Crear un grupo de inversión
exports.crearCooperativa = async (req, res) => {
  try {
    const { nombre, descripcion, id_admin } = req.body;
    const nuevaCoop = await Cooperativa.create({ nombre, descripcion, id_admin });
    res.status(201).json({ message: 'Cooperativa creada', cooperativa: nuevaCoop });
  } catch (error) {
    console.error('Error creando cooperativa:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todas las cooperativas
exports.obtenerCooperativas = async (req, res) => {
  try {
    const cooperativas = await Cooperativa.findAll();
    res.status(200).json(cooperativas);
  } catch (error) {
    console.error('Error obteniendo cooperativas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener una cooperativa por id
exports.obtenerCooperativaPorId = async (req, res) => {
  try {
    const { id_cooperativa } = req.params;
    const coop = await Cooperativa.findByPk(id_cooperativa);
    if (!coop) return res.status(404).json({ error: 'Cooperativa no encontrada' });
    res.status(200).json(coop);
  } catch (error) {
    console.error('Error obteniendo cooperativa:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar una cooperativa
exports.actualizarCooperativa = async (req, res) => {
  try {
    const { id_cooperativa } = req.params;
    const [actualizado] = await Cooperativa.update(req.body, { where: { id_cooperativa } });
    if (!actualizado) return res.status(404).json({ error: 'Cooperativa no encontrada' });
    const coopAct = await Cooperativa.findByPk(id_cooperativa);
    res.status(200).json({ message: 'Cooperativa actualizada', cooperativa: coopAct });
  } catch (error) {
    console.error('Error actualizando cooperativa:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Soft delete: marcar como "inactivo"
exports.eliminarCooperativa = async (req, res) => {
  try {
    const { id_cooperativa } = req.params;
    const [actualizado] = await Cooperativa.update(
      { estado: 'inactivo' },
      { where: { id_cooperativa } }
    );
    if (!actualizado) return res.status(404).json({ error: 'Cooperativa no encontrada' });
    res.status(200).json({ message: 'Cooperativa marcada como inactiva' });
  } catch (error) {
    console.error('Error eliminando cooperativa:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
