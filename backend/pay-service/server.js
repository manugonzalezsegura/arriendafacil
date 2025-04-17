// /backend/payment-service/server.js
const express = require('express');
const app     = express();
const cors    = require('cors');
const { port }= require('./config/env');
const paymentRoutes = require('./routes/payment.routes');

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/payments', paymentRoutes);

app.listen(port, ()=> console.log(`Payment Service listening on ${port}`));
