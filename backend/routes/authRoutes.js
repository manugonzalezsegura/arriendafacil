//   backend/routes/authRoutes.js

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middlewares/authMiddleware');
const { jwtSecret, jwtRefreshSecret, tokenExpiration, refreshTokenExpiration } = require('../config/env');

const router = express.Router();

/** 📌 Generar Access Token */
const generateAccessToken = (user) => {
  return jwt.sign({ id_user: user.id_user, email: user.email }, jwtSecret, { expiresIn: tokenExpiration });
};

/** 📌 Generar Refresh Token */
const generateRefreshToken = (user) => {
  return jwt.sign({ id_user: user.id_user }, jwtRefreshSecret, { expiresIn: refreshTokenExpiration });
};

/** 📌 Registrar usuario */
router.post('/register', async (req, res) => {
  const { email, nombre, telefono, uid } = req.body;
  if (!email || !nombre || !uid) return res.status(400).json({ message: 'Faltan datos' });

  try {
    const user = await User.create({ email, nombre, telefono, uid });
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

/** 📌 Iniciar sesión */
router.post('/login', async (req, res) => {
  const { email, uid } = req.body;
  if (!email || !uid) return res.status(400).json({ message: 'Faltan datos' });

  const user = await User.findOne({ where: { email, uid } });
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json({ accessToken, refreshToken });
});

/** 📌 Refrescar token */
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(403).json({ message: 'Refresh Token requerido' });

  const user = await User.findOne({ where: { refreshToken } });
  if (!user) return res.status(403).json({ message: 'Refresh Token inválido' });

  jwt.verify(refreshToken, jwtRefreshSecret, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Refresh Token expirado' });

    const newAccessToken = generateAccessToken(user);
    res.status(200).json({ accessToken: newAccessToken });
  });
});

/** 📌 Obtener perfil del usuario autenticado */
router.get('/profile', verifyToken, async (req, res) => {
  const user = await User.findByPk(req.user.id_user);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  res.status(200).json({ email: user.email, nombre: user.nombre, telefono: user.telefono });
});

/** 📌 Actualizar usuario */
router.put('/updateUser', verifyToken, async (req, res) => {
  const { nombre, email, telefono } = req.body;
  const user = await User.findByPk(req.user.id_user);

  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  await user.update({ nombre, email, telefono });
  res.status(200).json({ message: 'Usuario actualizado con éxito' });
});

module.exports = router;
