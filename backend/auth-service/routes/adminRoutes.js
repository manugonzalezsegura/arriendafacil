// /backend/auth-service/routes/adminRoutes.js
const express = require("express");
const router = express.Router();


const adminUsuariosController = require("../controllers/adminUsuariosController"); // 👈

const verificarToken = require("../middlewares/authMiddleware");
const verificarRol = require("../middlewares/verificarRol");

// Estadísticas ML

// Usuarios
router.get("/usuarios", verificarToken, verificarRol(["admin"]), adminUsuariosController.getAllUsuarios);
router.delete("/usuarios/:id", verificarToken, verificarRol(["admin"]), adminUsuariosController.deleteUsuario);

module.exports = router;
