// /backend/payment-service/models/associations.js
const UserStub      = require('./UserStub');
const PaymentIntent = require('./PaymentIntent');

// Un PaymentIntent pertenece a un UserStub
PaymentIntent.belongsTo(UserStub, { foreignKey: 'id_user' });
UserStub.hasMany(PaymentIntent, { foreignKey: 'id_user' });
