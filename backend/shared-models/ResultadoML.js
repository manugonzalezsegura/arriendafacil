//backend\shared-models\ResultadoML.js
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  return sequelize.define('ResultadoML', {
    id_resultado:  { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario:    { type: DataTypes.INTEGER, allowNull: false },
    score:         DataTypes.INTEGER,
    categoria:     DataTypes.ENUM('riesgo bajo', 'riesgo medio', 'riesgo alto'),
    puntualidad:   DataTypes.DECIMAL(4, 2),
    porcentaje:    DataTypes.DECIMAL(5, 2),
    profesion:     DataTypes.STRING,
    comuna:        DataTypes.INTEGER,
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'resultados_ml',
    timestamps: false
  });
};
