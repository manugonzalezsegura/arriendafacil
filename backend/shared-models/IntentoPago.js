// IntentoPago.js - fábrica de modelo IntentoPago
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  return sequelize.define('IntentoPago', {
    id_intento:    { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    id_usuario:    { type: DataTypes.INTEGER, allowNull: false },
    id_postulacion: { type: DataTypes.INTEGER, allowNull: false }, // NUEVO CAMPO
    monto:         { type: DataTypes.INTEGER, allowNull: false },
    moneda:        { type: DataTypes.STRING,  defaultValue: 'CLP' },
    proveedor:     { type: DataTypes.STRING,  defaultValue: 'transbank' },
    estado:        { type: DataTypes.ENUM('initialized','success','failed'), defaultValue: 'initialized' },
    token_ws:      { type: DataTypes.STRING },
    creado_en:     { type: DataTypes.DATE,    defaultValue: DataTypes.NOW },
    actualizado_en:{ type: DataTypes.DATE,    defaultValue: DataTypes.NOW }
  }, {
    tableName: 'IntentoPago',
    timestamps: false
  });
};