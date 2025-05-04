// postulaciones-service/models/Postulacion.model.js
const { DataTypes } = require('sequelize');
const { sequelize }  = require('../config/DB');

const Postulacion = sequelize.define('Postulacion', {
  id_postulacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Usuario', key: 'id_usuario' }
  },
  id_propiedad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Propiedad', key: 'id_propiedad' }
  },
  estado: {
    type: DataTypes.ENUM('pendiente','aceptada','rechazada'),
    defaultValue: 'pendiente'
  },
  mensaje: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'Postulacion',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: 'actualizado_en'
});

module.exports = Postulacion;
