// /backend/auth-service/controllers/authController.js
const { publish } = require('../utils/rabbitmq');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const serviceAccount = require('../firebase/serviceAccountKey.json');
const { Usuario, Rol, UsuarioRol, PerfilInquilino } = require('../models');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const {
  jwt: {
    secret: jwtSecret,
    refreshSecret: jwtRefreshSecret,
    expiresIn: tokenExpiration,
    refreshExpires: refreshTokenExpiration
  }
} = require('../config/env');

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

// 🚀 REGISTRO
exports.register = async (req, res) => {
  console.log('📥 register payload:', req.body);
  const { email, nombre, telefono, uid } = req.body;

  if (!email || !nombre || !uid) {
    console.warn('⚠️ Faltan datos obligatorios');
    return res.status(400).json({ message: 'Faltan datos: email, nombre y uid son requeridos' });
  }

  try {
    const nuevoUsuario = await Usuario.create({ email, nombre, telefono, uid });
    const id_usuario = nuevoUsuario.id_usuario;
    console.log('✅ Usuario creado con ID:', id_usuario);

    await UsuarioRol.create({ id_usuario, id_rol: 2 });
    console.log('✅ Rol inquilino asignado');

    await PerfilInquilino.create({ id_usuario });
    console.log('✅ PerfilInquilino creado');

    const accessToken = generateAccessToken(nuevoUsuario);
    const refreshToken = generateRefreshToken(nuevoUsuario);
    console.log('✅ Tokens generados');

    nuevoUsuario.refresh_token = refreshToken;
    await nuevoUsuario.save();
    console.log('✅ Refresh token guardado');

    await publish('user.registered', {
      id_usuario,
      nombre: nuevoUsuario.nombre,
      uid: nuevoUsuario.uid
    });
    console.log('📡 Evento user.registered publicado');

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error.message);
    console.error(error.stack);
    res.status(500).json({
      message: 'Error al registrar usuario',
      error: error.message
    });
  }
};

// 🔐 LOGIN
exports.login = async (req, res) => {
  console.log('📥 login payload:', req.body);
  const { email, uid } = req.body;

  if (!email || !uid) return res.status(400).json({ message: 'Faltan datos' });

  const usuario = await Usuario.findOne({ where: { email, uid } });
  if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

  const accessToken = generateAccessToken(usuario);
  const refreshToken = generateRefreshToken(usuario);

  usuario.refresh_token = refreshToken;
  await usuario.save();
  console.log('✅ Login exitoso - Tokens generados y guardados');

  res.status(200).json({ accessToken, refreshToken });
};

// 🔄 REFRESH TOKEN
exports.refresh = async (req, res) => {
  console.log('📥 refresh payload:', req.body);
  const { refreshToken } = req.body;

  if (!refreshToken) {
    console.warn('⚠️ Falta refreshToken en body');
    return res.status(403).json({ message: 'Refresh Token requerido' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { refresh_token: refreshToken } });
    console.log('🔍 Usuario encontrado para refresh_token:', usuario && usuario.toJSON());

    if (!usuario) return res.status(403).json({ message: 'Refresh Token inválido' });

    jwt.verify(refreshToken, jwtRefreshSecret, (err) => {
      if (err) {
        console.warn('⚠️ Token expirado o inválido:', err.message);
        return res.status(403).json({ message: 'Refresh Token expirado o inválido' });
      }

      const newAccessToken = generateAccessToken(usuario);
      console.log('🔄 Nuevo accessToken generado');
      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error('❌ Error en refresh:', error.message);
    console.error(error.stack);
    res.status(500).json({ message: 'Error en refresh token', error: error.message });
  }
};

// 👤 PERFIL
exports.getProfile = async (req, res) => {
  console.log('📥 getProfile - headers:', req.headers);
  console.log('📥 getProfile - req.user:', req.user);

  try {
    const id = req.user && req.user.id_usuario;
    console.log('🔍 Buscando usuario con id:', id);

    const usuario = await Usuario.findByPk(id);
    console.log('🔍 Usuario encontrado:', usuario && usuario.toJSON());

    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.status(200).json({
      email: usuario.email,
      nombre: usuario.nombre,
      telefono: usuario.telefono
    });
  } catch (error) {
    console.error('❌ Error en getProfile:', error.message);
    res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  }
};

// ✏️ ACTUALIZAR USUARIO
exports.updateUser = async (req, res) => {
  const { nombre, email, telefono } = req.body;
  const id = req.user.id_usuario;
  console.log('📥 updateUser payload:', req.body);

  const usuario = await Usuario.findByPk(id);
  if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

  await usuario.update({ nombre, email, telefono });
  console.log('✅ Usuario actualizado');

  return res.status(200).json({
    message: 'Usuario actualizado con éxito',
    usuario: {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono
    }
  });
};

// 🔑 LOGIN CON FIREBASE
// 🔑 LOGIN CON FIREBASE Y ROLES
exports.firebaseLogin = async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ message: 'Token de Firebase requerido' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    console.log('✅ Firebase ID token verificado, UID:', uid);

    let usuario = await Usuario.findOne({ where: { uid } });

    if (!usuario) {
      usuario = await Usuario.create({
        uid,
        email: decodedToken.email || `sin-correo-${uid}@ejemplo.com`,
        nombre: 'sin-nombre'
      });
      console.log('✅ Usuario creado desde Firebase:', usuario.toJSON());
    }

    // 🔎 Obtener roles del usuario
    const rolesUsuario = await UsuarioRol.findAll({
      where: { id_usuario: usuario.id_usuario },
      include: {
        model: Rol,
        attributes: ['nombre']
      }
    });

    const roles = rolesUsuario.map(r => r.Rol?.nombre).filter(Boolean);
    console.log('📤 Roles del usuario:', roles);

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, email: usuario.email },
      jwtSecret,
      { expiresIn: tokenExpiration || '1h' }
    );

    res.json({ token, roles }); // ← ahora sí enviamos roles al frontend
  } catch (error) {
    console.error('❌ Error verificando ID Token:', error.message);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};




// 🧱 FORM SCHEMA PARA FRONT
function generarFormSchema() {
  return {
    title: 'Usuario',
    type: 'object',
    properties: {
      nombre:   { type: 'string' },
      email:    { type: 'string', format: 'email' },
      telefono: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['nombre', 'email', 'password']
  };
}

exports.getRegisterFormSchema = (req, res) => {
  console.log('📤 Enviando schema de formulario de registro');
  const schema = generarFormSchema();
  res.json(schema);
};
