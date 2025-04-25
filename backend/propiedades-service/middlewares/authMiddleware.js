// propiedades-service/middlewares/authMiddleware.js

const jwtLib = require('jsonwebtoken');
const { jwt } = require('../config/env');

module.exports = (req, res, next) => {
  console.log('➤ authMiddleware: headers.authorization =', req.headers.authorization);
  
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.warn('❌ No authHeader');
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const [scheme, token] = authHeader.split(' ');
  console.log('➤ authMiddleware: scheme=', scheme, 'token=', token);

  if (scheme !== 'Bearer' || !token) {
    console.warn('❌ Formato de Authorization inválido');
    return res.status(401).json({ message: 'Formato de token inválido' });
  }

  try {
    const decoded = jwtLib.verify(token, jwt.secret);
    console.log('✅ JWT verificado. decoded =', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('❌ JWT verify error:', err);
    return res.status(403).json({ message: 'Token inválido' });
  }
};
