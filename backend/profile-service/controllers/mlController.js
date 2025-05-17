// backend\profile-service\routes\mlRoutes.js

const axios = require('axios');
const { PerfilInquilino, ResultadoML } = require('../models');

exports.evaluarRiesgoInquilino = async (req, res) => {
  try {
    const id_usuario = parseInt(req.params.id_usuario);
    const perfil = await PerfilInquilino.findOne({ where: { id_usuario } });

    if (!perfil) return res.status(404).json({ error: 'Perfil no encontrado' });

    const historial_pagos = [
      { mes: '2024-01', pagado: true },
      { mes: '2024-02', pagado: false },
      { mes: '2024-03', pagado: true }
    ]; // reemplaza luego por tus datos reales

    const payload = {
      id_usuario,
      id_comuna: perfil.id_comuna,
      sueldo: perfil.sueldo,
      sueldo_pareja: perfil.sueldo_pareja,
      dependientes: perfil.dependientes,
      profesion: perfil.profesion,
      antiguedad_laboral: perfil.antiguedad_laboral,
      puntaje_credito: perfil.puntaje_credito,
      historial_pagos
    };

    const { data } = await axios.post('http://ml-service:8000/calcular-score', payload);

    const resultado = await ResultadoML.create({
      id_usuario,
      score: data.score,
      categoria: data.categoria,
      puntualidad: data.puntualidad,
      porcentaje: data.porcentaje,
      profesion: perfil.profesion,
      comuna: perfil.id_comuna
    });

    res.json({ resultado, ml: data });
  } catch (err) {
    console.error('[ML ERROR]', err.message);
    res.status(500).json({ error: 'Error al evaluar riesgo' });
  }
};
