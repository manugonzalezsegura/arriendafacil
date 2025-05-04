// /backend/perfil-service/models/Valoracion.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const Usuario = require('../../auth-service/models/Usuario');

const Valoracion = sequelize.define('Valoracion', {
  id_valoracion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_autor:      { type: DataTypes.INTEGER, allowNull: false, references: { model: Usuario, key: 'id_usuario' } },
  id_receptor:   { type: DataTypes.INTEGER, allowNull: false, references: { model: Usuario, key: 'id_usuario' } },
  rol_receptor:  { type: DataTypes.ENUM('inquilino','arrendador'), allowNull: false },
  puntuacion:    { type: DataTypes.INTEGER, allowNull: false },
  comentario:    { type: DataTypes.TEXT },
  creado_en:     { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  actualizado_en:{ type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'Valoracion', timestamps: false
});

Usuario.hasMany(Valoracion, { as: 'ValoracionesHechas', foreignKey: 'id_autor' });
Usuario.hasMany(Valoracion, { as: 'ValoracionesRecibidas', foreignKey: 'id_receptor' });
Valoracion.belongsTo(Usuario, { as: 'Autor',    foreignKey: 'id_autor'    });
Valoracion.belongsTo(Usuario, { as: 'Receptor', foreignKey: 'id_receptor' });

module.exports = Valoracion;
