//  /backend/pay-service/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

module.exports = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(403).json({ message: 'Token requerido' });
  const token = header.split(' ')[1];
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
};
