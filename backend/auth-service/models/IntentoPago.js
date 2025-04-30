// /backend/pay-service/models/IntentoPago.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const Usuario = require('../../auth-service/models/Usuario');

const IntentoPago = sequelize.define('IntentoPago', {
  id_intento:   { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  id_usuario:   { type: DataTypes.INTEGER, allowNull: false, references: { model: Usuario, key: 'id_usuario' } },
  monto:        { type: DataTypes.INTEGER, allowNull: false },
  moneda:       { type: DataTypes.STRING,  defaultValue: 'CLP' },
  proveedor:    { type: DataTypes.STRING,  defaultValue: 'transbank' },
  estado:       { type: DataTypes.ENUM('initialized','success','failed'), defaultValue: 'initialized' },
  token_ws:     { type: DataTypes.STRING },
  creado_en:    { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  actualizado_en:{ type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'IntentoPago', timestamps: false
});

Usuario.hasMany(IntentoPago, { foreignKey: 'id_usuario' });
IntentoPago.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = IntentoPago;
