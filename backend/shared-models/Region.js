// /shared-models/Region.js

const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Region', {
    id_region: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre:    { type: DataTypes.STRING, allowNull: false, unique: true }
  }, {
    tableName: 'Region',
    timestamps: false
  });
};
