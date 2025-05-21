// /backend/auth-service/routes/adminRoutes.js
const express = require("express");
const router = express.Router();


const adminUsuariosController = require("../controllers/adminUsuariosController"); // 👈

const verificarToken = require("../middlewares/authMiddleware");
const verificarRol = require("../middlewares/verificarRol");

// Estadísticas ML

// Usuarios

router.get("/usuarios", verificarToken, verificarRol(["admin"]), adminUsuariosController.getAllUsuarios);
router.post("/usuarios", verificarToken, verificarRol(["admin"]), adminUsuariosController.crearUsuarioAdmin);
router.get("/form-schema", verificarToken, verificarRol(["admin"]), adminUsuariosController.getRegisterFormSchema); // ✅ ESTA es la ruta correcta
router.delete("/usuarios/:id", verificarToken, verificarRol(["admin"]), adminUsuariosController.deleteUsuario);
router.put('/usuarios/:id', verificarToken, verificarRol(['admin']), adminUsuariosController.updateUsuario);
module.exports = router;

