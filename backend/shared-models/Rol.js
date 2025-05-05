// Rol.js - fábrica de modelo Rol
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  return sequelize.define('Rol', {
    id_rol:      { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre:      { type: DataTypes.STRING,  allowNull: false, unique: true },
    descripcion: { type: DataTypes.TEXT }
  }, {
    tableName: 'Rol',
    timestamps: false
  });
};