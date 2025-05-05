// Postulacion.js - fábrica de modelo Postulacion
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  return sequelize.define('Postulacion', {
    id_postulacion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario:     { type: DataTypes.INTEGER, allowNull: false },
    id_propiedad:   { type: DataTypes.INTEGER, allowNull: false },
    estado:         { type: DataTypes.ENUM('pendiente','aceptada','rechazada'), defaultValue: 'pendiente' },
    mensaje:        { type: DataTypes.TEXT }
  }, {
    tableName: 'Postulacion',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
  });
};