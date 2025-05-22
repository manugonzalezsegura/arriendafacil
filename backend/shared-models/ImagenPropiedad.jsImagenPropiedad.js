// ImagenPropiedad.js - fábrica de modelo ImagenPropiedad

module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  return sequelize.define('ImagenPropiedad', {
    id_imagen: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    id_propiedad: {type: DataTypes.INTEGER,allowNull: false},
    url: {type: DataTypes.STRING,allowNull: false},
    orden: {type: DataTypes.INTEGER,allowNull: true },
    creado_en: {type: DataTypes.DATE,defaultValue: DataTypes.NOW}
  }, {
    tableName: 'ImagenPropiedad',
    timestamps: false
  });
};
