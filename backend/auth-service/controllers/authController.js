// /backend/auth-service/controllers/authController.js
const { publish } = require('../utils/rabbitmq');
const jwt = require('jsonwebtoken');
// Importo el modelo Sequelize llamado "Usuario"
const { Usuario } = require('../shared-models');

const {
  jwt: {
    secret:        jwtSecret,
    refreshSecret: jwtRefreshSecret,
    expiresIn:     tokenExpiration,
    refreshExpires:refreshTokenExpiration
  }
} =require('../config/env');


const generateAccessToken = usuario =>
  jwt.sign(
    { id_usuario: usuario.id_usuario, email: usuario.email },
    jwtSecret,
    { expiresIn: tokenExpiration }
  );

const generateRefreshToken = usuario =>
  jwt.sign(
    { id_usuario: usuario.id_usuario },
    jwtRefreshSecret,
    { expiresIn: refreshTokenExpiration }
  );



exports.register = async (req, res) => {
  const { email, nombre, telefono, uid } = req.body;
  if (!email || !nombre || !uid) return res.status(400).json({ message: 'Faltan datos' });

  try {
    const usuario = await usuario.create({ email, nombre, telefono, uid });
    const accessToken  = generateAccessToken(usuario);
    const refreshToken = generateRefreshToken(usuario);
    usuario.refreshToken = refreshToken;
    await usuario.save();

    // — Publica el evento —
    await publish('user.registered', {
      id_user: usuario.id_usuario,
      nombre:  usuario.nombre,
      uid:     usuario.uid
    });

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};




exports.login = async (req, res) => {
  const { email, uid } = req.body;
  if (!email || !uid) return res.status(400).json({ message: 'Faltan datos' });

  const usuario = await Usuario.findOne({ where: { email, uid } });

  if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

  const accessToken = generateAccessToken(usuario);
  const refreshToken = generateRefreshToken(usuario);

  usuario.refreshToken = refreshToken; 
  await usuario.save();

  res.status(200).json({ accessToken, refreshToken });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(403).json({ message: 'Refresh Token requerido' });

  const usuario = await Usuario.findOne({ where: { refreshToken } });

  if (!usuario) return res.status(403).json({ message: 'Refresh Token inválido' });
  
  jwt.verify(refreshToken, jwtRefreshSecret, (err) => {
    if (err) return res.status(403).json({ message: 'Refresh Token expirado' });
    res.status(200).json({ accessToken: generateAccessToken(usuario) });
  });
};



exports.getProfile = async (req, res) => {
  const usuario = await Usuario.findByPk(req.user.id_usuario);
  
  if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.status(200).json({ email: usuario.email, nombre: usuario.nombre, telefono: usuario.telefono });
};

exports.updateUser = async (req, res) => {
  const { nombre, email, telefono } = req.body;
  const user = await User.findByPk(req.user.id_user);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  await user.update({ nombre, email, telefono });
  res.status(200).json({ message: 'Usuario actualizado con éxito' });
};
