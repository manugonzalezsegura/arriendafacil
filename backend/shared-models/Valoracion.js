// Valoracion.js - fábrica de modelo Valoracion
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  return sequelize.define('Valoracion', {
    id_valoracion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_autor:      { type: DataTypes.INTEGER, allowNull: false },
    id_receptor:   { type: DataTypes.INTEGER, allowNull: false },
    rol_receptor:  { type: DataTypes.ENUM('inquilino','arrendador'), allowNull: false },
    puntuacion:    { type: DataTypes.INTEGER, allowNull: false },
    comentario:    { type: DataTypes.TEXT },
    creado_en:     { type: DataTypes.DATE,    defaultValue: DataTypes.NOW },
    actualizado_en:{ type: DataTypes.DATE,    defaultValue: DataTypes.NOW }
  }, {
    tableName: 'Valoracion',
    timestamps: false
  });
};