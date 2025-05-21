// Propiedad.js - fábrica de modelo Propiedad
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  return sequelize.define('Propiedad', {
    id_propiedad: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario:   { type: DataTypes.INTEGER,   allowNull: false },
    id_comuna:    { type: DataTypes.INTEGER },
    titulo:       { type: DataTypes.STRING,    allowNull: false },
    descripcion:  { type: DataTypes.TEXT,      allowNull: false },
    direccion:    { type: DataTypes.STRING,    allowNull: false },
    precio:       { type: DataTypes.DECIMAL(10,2), allowNull: false },
        tipo_propiedad:  { type: DataTypes.ENUM('casa', 'departamento'), allowNull: false }, 
    estado:       { type: DataTypes.ENUM('disponible','arrendada','eliminada'), defaultValue: 'disponible' },
    creado_en:    { type: DataTypes.DATE,      defaultValue: DataTypes.NOW },
    actualizado_en:{ type: DataTypes.DATE,      defaultValue: DataTypes.NOW }
  }, {
    tableName: 'Propiedad',
    timestamps: false
  });
};