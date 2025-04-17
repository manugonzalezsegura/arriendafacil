const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const UserStub = require('./UserStub');

const PaymentIntent = sequelize.define('PaymentIntent', {
  id_intent: {type: DataTypes.UUID,primaryKey: true,defaultValue: DataTypes.UUIDV4},
  userId: {type: DataTypes.INTEGER,allowNull: false,references: {model: UserStub,key: 'id_user'}},
  amount: {type: DataTypes.INTEGER,allowNull: false},
  currency: {type: DataTypes.STRING,allowNull: false,defaultValue: 'CLP'},
  provider: {type: DataTypes.STRING,allowNull: false,defaultValue: 'transbank'},
  status: {type: DataTypes.ENUM('initialized','success','failed'),
    defaultValue: 'initialized'
  },
  token_ws: {type: DataTypes.STRING},
  url: {type: DataTypes.STRING}
}, {
  timestamps: true
});

module.exports = PaymentIntent;
