// /shared-models/Comuna.js

const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Comuna', {
    id_comuna: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre:    { type: DataTypes.STRING, allowNull: false },
    id_region: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'Comuna',
    timestamps: false
  });
};
