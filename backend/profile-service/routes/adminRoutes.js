const express = require("express");
const router = express.Router();
const adminEstadisticasController = require("../controllers/adminEstadisticasController");
const verificarToken = require("../middlewares/authMiddleware");
const verificarRol = require("../middlewares/verificarRol");

router.get("/estadisticas", verificarToken, verificarRol(["admin"]), adminEstadisticasController.resumenGeneralEstadisticas);

module.exports = router;