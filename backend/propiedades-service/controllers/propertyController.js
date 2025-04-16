//  /backend/propiedades-service/controllers/propertyController.js

const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
  try {
    const id_user = req.user.id_user;
    const { titulo, descripcion, direccion, precio } = req.body;
    if (!titulo||!descripcion||!direccion||!precio)
      return res.status(400).json({ message: 'Faltan datos obligatorios' });

    const property = await Property.create({ id_user, titulo, descripcion, direccion, precio });
    res.status(201).json({ message: 'Propiedad creada', property });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear propiedad', error });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const props = await Property.findAll({ where: { estado: 'disponible' } });
    res.status(200).json(props);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener propiedades', error });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const prop = await Property.findByPk(req.params.id);
    if (!prop) return res.status(404).json({ message: 'No encontrada' });
    res.status(200).json(prop);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener propiedad', error });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { titulo, descripcion, direccion, precio, estado } = req.body;
    const prop = await Property.findByPk(req.params.id);
    if (!prop) return res.status(404).json({ message: 'No encontrada' });
    if (prop.id_user !== req.user.id_user)
      return res.status(403).json({ message: 'No autorizado' });

    await prop.update({ titulo, descripcion, direccion, precio, estado });
    res.status(200).json({ message: 'Actualizada', property: prop });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error });
  }
};


// pendiente de modificar o eliminar ya que quiero un soft delete
exports.deleteProperty = async (req, res) => {
  try {
    const prop = await Property.findByPk(req.params.id);
    if (!prop) return res.status(404).json({ message: 'No encontrada' });
    if (prop.id_user !== req.user.id_user)
      return res.status(403).json({ message: 'No autorizado' });

    await prop.destroy();
    res.status(200).json({ message: 'Eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error });
  }
};
