// /backend/auth-service/models/PerfilInquilino.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const Usuario = require('./Usuario');

const PerfilInquilino = sequelize.define('PerfilInquilino', {
  id_usuario:      { type: DataTypes.INTEGER, primaryKey: true, references: { model: Usuario, key: 'id_usuario' } },
  sueldo:          { type: DataTypes.DECIMAL(12,2) },
  dependientes:    { type: DataTypes.INTEGER },
  puntaje_credito: { type: DataTypes.INTEGER },
  creado_en:       { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  actualizado_en:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'PerfilInquilino', timestamps: false
});

Usuario.hasOne(PerfilInquilino, { foreignKey: 'id_usuario' });
PerfilInquilino.belongsTo(Usuario,  { foreignKey: 'id_usuario' });

module.exports = PerfilInquilino;
