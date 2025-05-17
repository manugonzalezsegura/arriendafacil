// PerfilInquilino.js - fábrica de modelo PerfilInquilino
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  return sequelize.define('PerfilInquilino', {
    id_usuario:      { type: DataTypes.INTEGER, primaryKey: true },
    id_comuna:    { type: DataTypes.INTEGER },
    sueldo:          { type: DataTypes.DECIMAL(12,2) },
    sueldo_pareja:   { type: DataTypes.DECIMAL(12,2) },
    dependientes:    { type: DataTypes.INTEGER },
    profesion:       { type: DataTypes.STRING },
    antiguedad_laboral: { type: DataTypes.INTEGER },  
    score:              { type: DataTypes.INTEGER, allowNull: true },
    creado_en:       { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    actualizado_en:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'PerfilInquilino',
    timestamps: false
  });
};


//por agregar comuna region edad (buenos pagadores segun edad)
//por ver si se agrega estado soltero casado
//posible funcion para biscar y filtrar propiedades en la base de datos 