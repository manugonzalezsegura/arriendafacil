// controllers/imagenController.js

const { ImagenPropiedad } = require('../models');

exports.guardarImagenes = async (req, res) => {
  const id_propiedad = parseInt(req.params.id, 10);
  const { urls } = req.body;

  if (!id_propiedad || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const registros = [];

    for (let i = 0; i < urls.length; i++) {
      const nueva = await ImagenPropiedad.create({
        id_propiedad,
        url: urls[i],
        orden: i
      });
      registros.push(nueva);
    }

    res.status(201).json({ mensaje: 'Imágenes guardadas', imagenes: registros });
  } catch (error) {
    console.error('❌ Error al guardar imágenes:', error);
    res.status(500).json({ error: 'Error interno al guardar imágenes' });
  }
};


exports.obtenerImagenes = async (req, res) => {
  const id_propiedad = parseInt(req.params.id, 10);

  if (!id_propiedad) {
    return res.status(400).json({ error: 'ID de propiedad inválido' });
  }

  try {
        const imagenes = await ImagenPropiedad.findAll({
        where: { id_propiedad },
        order: [['orden', 'ASC']]
        });

    res.status(200).json(imagenes);
  } catch (error) {
    console.error('❌ Error al obtener imágenes:', error);
    res.status(500).json({ error: 'Error interno al obtener imágenes' });
  }
};
