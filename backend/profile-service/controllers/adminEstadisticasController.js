const { ResultadoML } = require("../models");
const { Op } = require("sequelize");

exports.resumenGeneralEstadisticas = async (req, res) => {
  try {
    console.log("📊 Entrando a resumenGeneralEstadisticas()");

    const resultados = await ResultadoML.findAll();
    console.log("📦 Resultados totales obtenidos:", resultados.length);

    if (!resultados.length) {
      console.warn("⚠️ No hay datos en resultados_ml");
      return res.status(200).json([]);
    }

    const agrupado = {};

    resultados.forEach((r, i) => {
      console.log(`➡️ Resultado[${i}]:`, {
        id_usuario: r.id_usuario,
        profesion: r.profesion,
        score: r.score,
        puntualidad: r.puntualidad,
        categoria: r.categoria
      });

      const p = r.profesion || 'Desconocida';

      if (!agrupado[p]) {
        agrupado[p] = {
          scores: [],
          puntualidades: [],
          riesgos: {}
        };
      }

      agrupado[p].scores.push(r.score);
      agrupado[p].puntualidades.push(Number(r.puntualidad));
      agrupado[p].riesgos[r.categoria] = (agrupado[p].riesgos[r.categoria] || 0) + 1;
    });

    console.log("🧪 Datos agrupados por profesión:", Object.keys(agrupado));

    const resumen = Object.entries(agrupado).map(([profesion, datos]) => {
      const promedioScore = datos.scores.reduce((a, b) => a + b, 0) / datos.scores.length;
      const promedioPuntualidad = datos.puntualidades.reduce((a, b) => a + b, 0) / datos.puntualidades.length;
      const max = Math.max(...datos.scores);
      const min = Math.min(...datos.scores);

      const riesgosArray = Object.entries(datos.riesgos);
      console.log(`📌 Riesgos para ${profesion}:`, riesgosArray);

      let riesgoDominante = 'Sin datos';
      if (riesgosArray.length > 0) {
        riesgoDominante = riesgosArray.sort((a, b) => b[1] - a[1])[0][0];
      }

      const fila = {
        profesion,
        promedio_score: Math.round(promedioScore),
        promedio_puntualidad: promedioPuntualidad.toFixed(2),
        total_usuarios: datos.scores.length,
        riesgo_dominante: riesgoDominante,
        max_score: max,
        min_score: min
      };

      console.log(`✅ Fila resumen ${profesion}:`, fila);
      return fila;
    });

    res.json(resumen);
  } catch (error) {
    console.error("❌ Error al calcular resumen:", error.message);
    console.error(error.stack);
    res.status(500).json({ error: "Error al obtener estadísticas", detalle: error.message });
  }
};
