// backend\shared-models\PerfilArrendador.js

module.exports = (sequelize) => {
    const { DataTypes } = require('sequelize');
    return sequelize.define('PerfilArrendador', {
      id_usuario:     { type: DataTypes.INTEGER, primaryKey: true },
      id_comuna:      { type: DataTypes.INTEGER },
      empresa:        { type: DataTypes.STRING },
      propiedades_activas: { type: DataTypes.INTEGER, defaultValue: 0 },
      creado_en:      { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      actualizado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
      tableName: 'PerfilArrendador',
      timestamps: false
    });
  };