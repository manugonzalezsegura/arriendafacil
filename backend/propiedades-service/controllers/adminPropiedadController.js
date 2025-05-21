// /backend/propiedades-service/controllers/adminPropiedadController.js
const { Propiedad, Usuario } = require('../models');

// Obtener todas las propiedades para el panel de administración
exports.getAllPropiedades = async (req, res) => {
  try {
    console.log("📥 [ADMIN] getAllPropiedades llamado");
    const propiedades = await Propiedad.findAll({
      attributes: ['id_propiedad', 'titulo', 'direccion', 'precio', 'estado', 'id_usuario'],
      order: [['creado_en', 'DESC']]
    });

    console.log(`📊 Propiedades encontradas: ${propiedades.length}`);
    res.json(propiedades);
  } catch (err) {
    console.error("❌ Error en getAllPropiedades:", err.message);
    res.status(500).json({ error: 'Error al obtener propiedades' });
  }
};

// Actualizar datos editables de una propiedad
exports.updatePropiedad = async (req, res) => {
  const { id } = req.params;
  const { titulo, direccion, precio, estado } = req.body;

  try {
    console.log(`🛠️ [ADMIN] Actualizando propiedad ID: ${id}`);

    const propiedad = await Propiedad.findByPk(id);
    if (!propiedad) {
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }

    propiedad.titulo = titulo;
    propiedad.direccion = direccion;
    propiedad.precio = precio;
    propiedad.estado = estado;
    await propiedad.save();

    console.log("✅ Propiedad actualizada:", propiedad.toJSON());
    res.json(propiedad);
  } catch (err) {
    console.error("❌ Error en updatePropiedad:", err.message);
    res.status(500).json({ error: 'Error al actualizar propiedad' });
  }
};
