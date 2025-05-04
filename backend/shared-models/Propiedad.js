// /backend/propiedades-service/models/Propiedad.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const Usuario = require('../../auth-service/models/Usuario'); // apuntando al mismo modelo global

const Propiedad = sequelize.define('Propiedad', {
  id_propiedad: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_usuario:   { type: DataTypes.INTEGER, allowNull: false, references: { model: Usuario, key: 'id_usuario' } },
  titulo:       { type: DataTypes.STRING, allowNull: false },
  descripcion:  { type: DataTypes.TEXT,   allowNull: false },
  direccion:    { type: DataTypes.STRING, allowNull: false },
  precio:       { type: DataTypes.DECIMAL(10,2), allowNull: false },
  estado:       { type: DataTypes.ENUM('disponible','arrendada','eliminada'), defaultValue: 'disponible' },
  creado_en:    { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  actualizado_en:{ type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'Propiedad', timestamps: false
});

Usuario.hasMany(Propiedad, { foreignKey: 'id_usuario' });
Propiedad.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Propiedad;
