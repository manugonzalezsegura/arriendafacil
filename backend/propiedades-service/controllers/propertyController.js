// /backend/propiedades-service/controllers/propertyController.js

// ① Importa el modelo correctamente inyectado
//    shared-models exporta `Propiedad`, lo renombramos a `Property` si prefieres inglés
const { Propiedad ,UsuarioRol, Rol} = require('../models');

exports.createProperty = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const { titulo, descripcion, direccion, precio, id_comuna, tipo_propiedad } = req.body;

    if (!titulo || !descripcion || !direccion || !precio || !id_comuna || !tipo_propiedad)
      return res.status(400).json({ message: 'Faltan datos obligatorios' });

    const property = await Propiedad.create({
      id_usuario,
      titulo,
      descripcion,
      direccion,
      precio,
      id_comuna,
      tipo_propiedad
    });

    res.status(201).json({ message: 'Propiedad creada', property });
  } catch (error) {
    console.error('❌ createProperty error:', error.message);
    return res.status(500).json({ message: 'Error al crear propiedad', error: error.message });
  }
};





// backend/propiedades-service/controllers/propertyController.js
exports.getMisPropiedades = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const props = await Propiedad.findAll({ where: { id_usuario } });
    res.status(200).json(props);
  } catch (error) {
    console.error('❌ getMisPropiedades error:', error.message);
    res.status(500).json({ message: 'Error al obtener propiedades del usuario' });
  }
};




// deberia eliminarlo ?
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
    console.log('🔍 ID recibido en getPropertyById:', req.params.id);
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


exports.filtrarPropiedades = async (req, res) => {
  console.log('🟢 Inicia filtro de propiedades (solo precio máximo)');
  try {
    const { id_comuna, id_region, precio_max } = req.query;

    // Importar modelos adicionales solo si no los tienes ya arriba
    const { Propiedad, Comuna, Region } = require('../models');

    const where = { estado: 'disponible' };

    // Filtro por precio máximo solamente
    if (precio_max) where.precio = { [Op.lte]: precio_max };

    // Filtro por comuna
    if (id_comuna) where.id_comuna = id_comuna;

    // Construir include para region solo si hace falta
    let include = [];
    if (id_region) {
      include.push({
        model: Comuna,
        where: { id_region },
        include: [{ model: Region }]
      });
    } else {
      include.push({ model: Comuna, include: [{ model: Region }] });
    }

    const propiedades = await Propiedad.findAll({ where, include });

    console.log(`🟢 Propiedades encontradas: ${propiedades.length}`);
    res.status(200).json(propiedades);

  } catch (error) {
    console.error('❌ Error en filtrarPropiedades:', error.message);
    res.status(500).json({ message: 'Error al filtrar propiedades', error: error.message });
  }
};



function generarPropiedadSchema() {
  return {
    title: 'Propiedad',
    type: 'object',
    properties: {
      titulo: {
        type: 'string',
        minLength: 5,
        title: 'Título de la Propiedad'
      },
      descripcion: {
        type: 'string',
        title: 'Descripción'
      },
      direccion: {
        type: 'string',
        title: 'Dirección'
      },
      precio: {
        type: 'number',
        minimum: 0,
        title: 'Precio'
      },
      tipo_propiedad: {
        type: 'string',
        enum: ['casa', 'departamento'],
        title: 'Tipo de Propiedad'
      },
      id_comuna: {
        type: 'integer',
        title: 'Comuna' // será usada en el frontend con la lista cargada desde región
      }
    },
    required: ['titulo', 'descripcion', 'direccion', 'precio', 'tipo_propiedad', 'id_comuna']
  };
}


exports.getPropiedadSchema = (req, res) => {
  const schema = generarPropiedadSchema();
  res.json(schema);
};


