// /backend/cooperativa-service/controllers/PerfilMiembroController.js

const path = require('path');
const fs   = require('fs');

console.log('— PerfilMiembroController cargado desde:', __dirname);
console.log('— Carpeta models contiene:', fs.readdirSync(path.resolve(__dirname, '../models')));

const PerfilMiembro = require('../models/PerfilMiembro');

// Crear un miembro
exports.crearMiembro = async (req, res) => {
  try {
    const { id_usuario, rol, estado } = req.body;
    const nuevoMiembro = await PerfilMiembro.create({ id_usuario, rol, estado });
    res.status(201).json({ message: 'Miembro creado', miembro: nuevoMiembro });
  } catch (error) {
    console.error('Error creando miembro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todos los miembros
exports.obtenerMiembros = async (req, res) => {
  try {
    const miembros = await PerfilMiembro.findAll();
    res.status(200).json(miembros);
  } catch (error) {
    console.error('Error obteniendo miembros:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un miembro por id
exports.obtenerMiembroPorId = async (req, res) => {
  try {
    const { id_miembro } = req.params;
    const miembro = await PerfilMiembro.findByPk(id_miembro);
    if (!miembro) return res.status(404).json({ error: 'Miembro no encontrado' });
    res.status(200).json(miembro);
  } catch (error) {
    console.error('Error obteniendo miembro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un miembro
exports.actualizarMiembro = async (req, res) => {
  try {
    const { id_miembro } = req.params;
    const [actualizado] = await PerfilMiembro.update(req.body, { where: { id_miembro } });
    if (!actualizado) return res.status(404).json({ error: 'Miembro no encontrado' });
    const miembroActualizado = await PerfilMiembro.findByPk(id_miembro);
    res.status(200).json({ message: 'Miembro actualizado', miembro: miembroActualizado });
  } catch (error) {
    console.error('Error actualizando miembro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar (soft delete) un miembro
exports.eliminarMiembro = async (req, res) => {
  try {
    const { id_miembro } = req.params;
    const [actualizado] = await PerfilMiembro.update(
      { estado: 'retirado' },
      { where: { id_miembro } }
    );
    if (!actualizado) return res.status(404).json({ error: 'Miembro no encontrado' });
    res.status(200).json({ message: 'Miembro marcado como retirado' });
  } catch (error) {
    console.error('Error eliminando miembro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
