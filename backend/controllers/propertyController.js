// /backend/controllers/propertyController.js
const Property = require('../models/Property');

const createProperty = async (req, res) => {
  try {
    // Se asume que el middleware de autenticación (verifyToken) ya puso el id del usuario en req.user.id_user
    const id_user = req.user.id_user;
    const { titulo, descripcion, direccion, precio } = req.body;
    
    if (!titulo || !descripcion || !direccion || !precio) {
      return res.status(400).json({ message: 'Faltan datos obligatorios para la propiedad' });
    }
    
    const property = await Property.create({
      id_user,
      titulo,
      descripcion,
      direccion,
      precio
    });

    res.status(201).json({ message: 'Propiedad creada exitosamente', property });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la propiedad', error });
  }
};



const getProperties = async (req, res) => {
  try {
    // Obtener todas las propiedades disponibles (ejemplo)
    const properties = await Property.findAll({ where: { estado: 'disponible' } });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las propiedades', error });
  }
};



const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ message: 'Propiedad no encontrada' });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la propiedad', error });
  }
};



const updateProperty = async (req, res) => {
  try {
    const { titulo, descripcion, direccion, precio, estado } = req.body;
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ message: 'Propiedad no encontrada' });

    // Opcional: Verificar que el usuario autenticado sea el dueño de la propiedad
    if (property.id_user !== req.user.id_user) {
      return res.status(403).json({ message: 'No autorizado para actualizar esta propiedad' });
    }

    await property.update({ titulo, descripcion, direccion, precio, estado });
    res.status(200).json({ message: 'Propiedad actualizada con éxito', property });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la propiedad', error });
  }
};



const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ message: 'Propiedad no encontrada' });

    // Opcional: Verificar que el usuario autenticado sea el dueño
    if (property.id_user !== req.user.id_user) {
      return res.status(403).json({ message: 'No autorizado para eliminar esta propiedad' });
    }

    await property.destroy();
    res.status(200).json({ message: 'Propiedad eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la propiedad', error });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
};
