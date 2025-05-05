// /backend/propiedades-service/controllers/propertyController.js

// ① Importa el modelo correctamente inyectado
//    shared-models exporta `Propiedad`, lo renombramos a `Property` si prefieres inglés
const { Propiedad } = require('../models');

exports.createProperty = async (req, res) => {
  try {
    // ② Usa el campo que firma el token: req.user.id_usuario
    const id_usuario  = req.user.id_usuario;
    const { titulo, descripcion, direccion, precio } = req.body;
    if (!titulo || !descripcion || !direccion || !precio)
      return res.status(400).json({ message: 'Faltan datos obligatorios' });

    const property = await Propiedad.create({
      id_usuario, 
      titulo, descripcion, direccion, precio
    });
    res.status(201).json({ message: 'Propiedad creada', property });
  } catch (error) {
    console.error('❌ createProperty error:', error.message);
    return res.status(500).json({ message: 'Error al crear propiedad', error: error.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const props = await Propiedad.findAll({ where: { estado: 'disponible' } });
    res.status(200).json(props);
  } catch (error) {
    console.error('❌ getProperties error:', error.message);
    return res.status(500).json({ message: 'Error al obtener propiedades', error: error.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const prop = await Propiedad.findByPk(req.params.id);
    if (!prop) return res.status(404).json({ message: 'No encontrada' });
    res.status(200).json(prop);
  } catch (error) {
    console.error('❌ getPropertyById error:', error.message);
    return res.status(500).json({ message: 'Error al obtener propiedad', error: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { titulo, descripcion, direccion, precio, estado } = req.body;
    const prop = await Propiedad.findByPk(req.params.id);
    if (!prop) return res.status(404).json({ message: 'No encontrada' });
    if (prop.id_usuario !== req.user.id_usuario)
      return res.status(403).json({ message: 'No autorizado' });

    await prop.update({ titulo, descripcion, direccion, precio, estado });
    res.status(200).json({ message: 'Actualizada', property: prop });
  } catch (error) {
    console.error('❌ updateProperty error:', error.message);
    return res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const prop = await Propiedad.findByPk(req.params.id);
    if (!prop) return res.status(404).json({ message: 'No encontrada' });
    if (prop.id_usuario !== req.user.id_usuario)
      return res.status(403).json({ message: 'No autorizado' });

    // Aquí podrías en lugar de destroy() hacer un soft delete: prop.update({ estado: 'eliminada' })
    await prop.destroy();
    res.status(200).json({ message: 'Eliminada' });
  } catch (error) {
    console.error('❌ deleteProperty error:', error.message);
    return res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};
