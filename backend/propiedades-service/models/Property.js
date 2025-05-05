//   /backend/propiedades-service/models/Property.js
/*
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const User = require('./UserStub');
const UserStub = require('./UserStub');

const Property = sequelize.define('Property', {
  id_property: {type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
  id_user: {type: DataTypes.INTEGER,allowNull: false,references: {model: UserStub,key: 'id_user'}},// Relacionamos la propiedad con el usuario que la crea (dueño)
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: false },
  direccion: { type: DataTypes.STRING, allowNull: false },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  estado: { 
    type: DataTypes.ENUM('disponible', 'arrendada', 'eliminada'),
    defaultValue: 'disponible'
  }
}, { timestamps: true });

// Relación: Un usuario tiene muchas propiedades
UserStub.hasMany(Property, { foreignKey: 'id_user' });
Property.belongsTo(UserStub, { foreignKey: 'id_user' });
module.exports = Property;

*/