// /backend/models/Property.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/DB');
const User = require('./User');

const Property = sequelize.define('Property', {
  id_property: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  // Relacionamos la propiedad con el usuario que la crea (dueño)
  id_user: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User,
      key: 'id_user'
    }
  },
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
User.hasMany(Property, { foreignKey: 'id_user' });
Property.belongsTo(User, { foreignKey: 'id_user' });

module.exports = Property;
