// backend\shared-models\HistorialArrendamiento.js

module.exports = (sequelize) => {
    const { DataTypes } = require('sequelize');
    return sequelize.define('HistorialArrendamiento', {
      id_arrendamiento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      id_inquilino:     { type: DataTypes.INTEGER, allowNull: false }, // Usuario que alquila
      id_arrendador:    { type: DataTypes.INTEGER, allowNull: false },
      id_propiedad:     { type: DataTypes.INTEGER, allowNull: false },
      fecha_inicio:     { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      fecha_termino:    { type: DataTypes.DATE },
      estado:           { type: DataTypes.ENUM('activo', 'terminado', 'cancelado'), defaultValue: 'activo' },
      creado_en:        { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      actualizado_en:   { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
      tableName: 'HistorialArrendamiento',
      timestamps: false
    });
  };