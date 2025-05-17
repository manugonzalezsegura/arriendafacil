//  /backend/profile-service/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/env');  // Cambia nombre a jwtConfig para evitar conflicto
 

module.exports = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(403).json({ message: 'Token requerido' });
  const token = header.split(' ')[1];
  console.log('🔑 JWT Secret (profile-service):', jwtConfig.secret);
  console.log('🔎 Token recibido:', token);
  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
};
