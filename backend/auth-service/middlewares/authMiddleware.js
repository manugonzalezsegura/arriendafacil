//  /backend/auth-service/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const { jwt: { secret: jwtSecret } } = require('../config/env');

module.exports = (req, res, next) => {
  // 1️⃣ Log del header Authorization
  console.log('🔐 authMiddleware - Authorization header:', req.headers.authorization);

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token missing' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, jwtSecret, (err, decoded) => {
    // 2️⃣ Log del resultado de jwt.verify
    console.log('🔐 authMiddleware - verify error:', err);
    console.log('🔐 authMiddleware - decoded payload:', decoded);

    if (err) return res.status(401).json({ message: 'Invalid token' });
    // Fíjate en el nombre del campo (debe coincidir con lo que pusiste en sign)
    req.user = decoded;  
    next();
  });
};