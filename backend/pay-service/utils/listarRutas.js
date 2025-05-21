// /backend/auth-service/utils/listarRutas.js
function listarRutas(router, basePath = '') {
  const rutas = [];

  router.stack.forEach((layer) => {
    if (layer.route && layer.route.path) {
      const path = basePath + layer.route.path;
      const methods = Object.keys(layer.route.methods).map((m) => m.toUpperCase());
      rutas.push({ path, methods });
    }
  });

  return rutas;
}

module.exports = { listarRutas };
