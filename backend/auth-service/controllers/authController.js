// /backend/auth-service/controllers/authController.js
const { publish } = require('../utils/rabbitmq');
const jwt = require('jsonwebtoken');
// Importo el modelo Sequelize llamado "Usuario"
const { Usuario } = require('../models');

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
    // 1) Loguea el body recibido para verificar qué datos envía el cliente
    console.log('📥 register payload:', req.body);
  
    const { email, nombre, telefono, uid } = req.body;
    if (!email || !nombre || !uid) {
      console.warn('⚠️ Faltan datos en register');
      return res.status(400).json({ message: 'Faltan datos: email, nombre y uid son requeridos' });
    }
  
    try {
      // 2) Usar correctamente el modelo Usuario (con U mayúscula)
      const nuevoUsuario = await Usuario.create({ email, nombre, telefono, uid });
      console.log('✅ Usuario creado:', { id: nuevoUsuario.id_usuario, email: nuevoUsuario.email });
  
      // 3) Genera y guarda tokens
      const accessToken  = generateAccessToken(nuevoUsuario);
      const refreshToken = generateRefreshToken(nuevoUsuario);
      nuevoUsuario.refresh_token = refreshToken;
      await nuevoUsuario.save();
  
      // 4) Publica evento en RabbitMQ
      await publish('user.registered', {
        id_usuario: nuevoUsuario.id_usuario,
        nombre:     nuevoUsuario.nombre,
        uid:        nuevoUsuario.uid
      });
      console.log('🐇 Evento user.registered publicado');
  
      // 5) Responde con los tokens
      res.status(201).json({ accessToken, refreshToken });
    } catch (error) {
      // 6) Loguea error completo para depuración
      console.error('❌ Error al registrar usuario:', error.message);
      console.error(error.stack);
  
      // 7) Devuelve al cliente solo el mensaje de error
      res.status(500).json({
        message: 'Error al registrar usuario',
        error:   error.message
      });
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
  console.log('📥 refresh payload:', req.body);
  const { refreshToken } = req.body;
  if (!refreshToken) {
    console.warn('⚠️ Falta refreshToken en body');
    return res.status(403).json({ message: 'Refresh Token requerido' });
  }

  try {
    // 🚩 Busca en la columna correcta
    const usuario = await Usuario.findOne({ where: { refresh_token: refreshToken } });
    console.log('🔍 Usuario con refresh_token:', usuario && usuario.toJSON());

    if (!usuario) {
      console.warn('⚠️ Refresh Token inválido');
      return res.status(403).json({ message: 'Refresh Token inválido' });
    }

    jwt.verify(refreshToken, jwtRefreshSecret, (err) => {
      if (err) {
        console.warn('⚠️ Refresh Token expirado o inválido:', err.message);
        return res.status(403).json({ message: 'Refresh Token expirado o inválido' });
      }
      const newAccessToken = generateAccessToken(usuario);
      console.log('🔄 Nuevo accessToken generado');
      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error('❌ Error en refresh:', error.message);
    console.error(error.stack);
    res.status(500).json({
      message: 'Error en refresh token',
      error:   error.message
    });
  }
};


exports.getProfile = async (req, res) => {
  // 3️⃣ Log headers y req.user
  console.log('📥 getProfile - headers:', req.headers);
  console.log('📥 getProfile - req.user payload:', req.user);

  try {
    const id = req.user && req.user.id_usuario;  // ajústalo si tu payload usa otro campo
    console.log('🔍 getProfile - buscando usuario con id:', id);

    const usuario = await Usuario.findByPk(id);
    console.log('🔍 getProfile - resultado Usuario.findByPk:', usuario && usuario.toJSON());

    if (!usuario) {
      console.warn('⚠️ getProfile - usuario no encontrado');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({
      email: usuario.email,
      nombre: usuario.nombre,
      telefono: usuario.telefono
    });
  } catch (error) {
    console.error('❌ getProfile error:', error.message);
    console.error(error.stack);
    res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  }
};





exports.updateUser = async (req, res) => {
  const { nombre, email, telefono } = req.body;
  const id = req.user.id_usuario;            // tu payload trae id_usuario
  
  // --- Aquí debes usar Usuario, NO User ---
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

  await usuario.update({ nombre, email, telefono });
  return res.status(200).json({
    message: 'Usuario actualizado con éxito',
    usuario: {
      id_usuario: usuario.id_usuario,
      nombre:     usuario.nombre,
      email:      usuario.email,
      telefono:   usuario.telefono
    }
  });
};
