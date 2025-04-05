//  backend/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  jwt.verify(token.split(" ")[1], jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
