// Usuario.js - fábrica de modelo Usuario
// Recibe la instancia de Sequelize y define la tabla 'Usuario'
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  return sequelize.define('Usuario', {
    id_usuario:      { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    uid:             { type: DataTypes.STRING },
    nombre:          { type: DataTypes.STRING,  allowNull: false },
    email:           { type: DataTypes.STRING,  allowNull: false, unique: true },
    telefono:        { type: DataTypes.STRING },
    refresh_token:   { type: DataTypes.STRING },
    esta_activo:     { type: DataTypes.BOOLEAN, defaultValue: true },
    creado_en:       { type: DataTypes.DATE,    defaultValue: DataTypes.NOW },
    actualizado_en:  { type: DataTypes.DATE,    defaultValue: DataTypes.NOW }
  }, {
    tableName: 'Usuario',
    timestamps: false
  });
};