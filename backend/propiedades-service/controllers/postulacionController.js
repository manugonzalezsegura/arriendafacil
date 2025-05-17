// /backend/propiedades-service/controllers/postulacionController.js
const { Postulacion, Usuario, PerfilInquilino, Propiedad } = require('../models');

exports.crearPostulacion = async (req, res) => {
  const id_usuario = req.user.id_usuario;
  const { id_propiedad, mensaje } = req.body;

  console.log(`📨 Nueva postulación - Usuario ${id_usuario} a propiedad ${id_propiedad}`);

  try {
    // Validar si ya existe una postulación previa
    const yaExiste = await Postulacion.findOne({
      where: { id_usuario, id_propiedad }
    });

    if (yaExiste) {
      return res.status(400).json({ error: 'Ya has postulado a esta propiedad' });
    }

    const nueva = await Postulacion.create({
      id_usuario,
      id_propiedad,
      mensaje,
      estado: 'pendiente'
    });

    console.log("✅ Postulación registrada:", nueva.toJSON());
    res.status(201).json(nueva);
  } catch (error) {
    console.error("❌ Error al postular:", error.message);
    res.status(500).json({ error: 'Error al crear postulación' });
  }
};

exports.obtenerPostulacionesRecibidas = async (req, res) => {
  const id_arrendador = req.user.id_usuario;

  try {
    console.log(`📥 Cargando postulaciones recibidas por usuario ${id_arrendador}`);

    // Buscar propiedades del usuario
    const propiedades = await Propiedad.findAll({
      where: { id_usuario: id_arrendador },
      attributes: ['id_propiedad']
    });

    const idsPropiedades = propiedades.map(p => p.id_propiedad);

    const postulaciones = await Postulacion.findAll({
      where: { id_propiedad: idsPropiedades },
      include: [
        {
          model: Usuario,
          attributes: ['nombre', 'email', 'telefono']
        },
        {
          model: PerfilInquilino,
          attributes: [
            'sueldo',
            'dependientes',
            'profesion',
            'score',
            'creado_en',
            
          ]
        },
        {
          model: Propiedad,
          attributes: ['titulo', 'direccion', 'precio']
        }
      ],
      order: [['creado_en', 'DESC']]
    });

    console.log(`📦 ${postulaciones.length} postulaciones encontradas`);
    res.json(postulaciones);
  } catch (error) {
    console.error("❌ Error al obtener postulaciones:", error.message);
    res.status(500).json({ error: 'Error al obtener postulaciones' });
  }
};



exports.obtenerMisPostulaciones = async (req, res) => {
  const id_usuario = req.user.id_usuario;

  try {
    console.log(`📥 Buscando postulaciones hechas por el usuario ${id_usuario}`);

    const postulaciones = await Postulacion.findAll({
      where: { id_usuario },
      include: [
        {
          model: Propiedad,
          attributes: ['titulo', 'direccion', 'precio', 'estado']
        }
      ],
      order: [['creado_en', 'DESC']]
    });

    console.log(`📦 Postulaciones encontradas: ${postulaciones.length}`);
    res.json(postulaciones);
  } catch (error) {
    console.error("❌ Error al obtener mis postulaciones:", error.message);
    res.status(500).json({ error: 'Error al obtener tus postulaciones' });
  }
};


exports.actualizarEstadoPostulacion = async (req, res) => {
  const { id_postulacion } = req.params;
  const { estado } = req.body;

  console.log(`📥 Solicitando cambio de estado para postulación ${id_postulacion} a '${estado}'`);

  try {
    if (!['aceptada', 'rechazada'].includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido' });
    }

    // 1. Buscar la postulación a actualizar
    const postulacion = await Postulacion.findByPk(id_postulacion);
    if (!postulacion) {
      console.warn(`⚠️ Postulación ${id_postulacion} no encontrada`);
      return res.status(404).json({ error: 'Postulación no encontrada' });
    }

    // 2. Verificar que el usuario que intenta actualizar sea el dueño de la propiedad
    const propiedad = await Propiedad.findByPk(postulacion.id_propiedad);
    if (!propiedad) {
      console.warn(`⚠️ Propiedad asociada ${postulacion.id_propiedad} no encontrada`);
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }

    if (propiedad.id_usuario !== req.user.id_usuario) {
      return res.status(403).json({ error: 'No tienes permiso para actualizar esta postulación' });
    }

    // 3. Actualizar estado de la postulación
    await postulacion.update({ estado });
    console.log(`✅ Postulación ${id_postulacion} actualizada a '${estado}'`);

    // 4. Si es "aceptada":
    if (estado === 'aceptada') {
      await propiedad.update({ estado: 'arrendada' });
      console.log(`🏠 Propiedad ${propiedad.id_propiedad} marcada como arrendada`);

      const result = await Postulacion.update(
        { estado: 'rechazada' },
        {
          where: {
            id_propiedad: propiedad.id_propiedad,
            id_postulacion: { [require('sequelize').Op.ne]: postulacion.id_postulacion },
            estado: 'pendiente'
          }
        }
      );
      console.log(`🔃 Otras postulaciones rechazadas:`, result[0]);

      postulacion.requiere_pago = true;
      await postulacion.save();
      console.log(`💰 Campo 'requiere_pago' activado en postulación ${postulacion.id_postulacion}`);
    }

    return res.status(200).json({ message: `Postulación ${estado}`, postulacion });

  } catch (error) {
    console.error('❌ Error al actualizar postulación:', error.message);
    return res.status(500).json({ error: 'Error al actualizar estado de postulación' });
  }
};

