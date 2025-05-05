// PerfilInquilino.js - fábrica de modelo PerfilInquilino
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  return sequelize.define('PerfilInquilino', {
    id_usuario:      { type: DataTypes.INTEGER, primaryKey: true },
    sueldo:          { type: DataTypes.DECIMAL(12,2) },
    dependientes:    { type: DataTypes.INTEGER },
    puntaje_credito: { type: DataTypes.INTEGER },
    creado_en:       { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    actualizado_en:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'PerfilInquilino',
    timestamps: false
  });
};