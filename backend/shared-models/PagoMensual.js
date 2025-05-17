// /backend/shared-models/PagoMensual.js

module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  return sequelize.define('PagoMensual', {
    id_pago_mensual: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    id_postulacion: { type: DataTypes.INTEGER, allowNull: false },
    mes: { type: DataTypes.DATEONLY, allowNull: false }, // formato 'YYYY-MM-01'
    monto: { type: DataTypes.INTEGER, allowNull: false },
    pagado: { type: DataTypes.BOOLEAN, defaultValue: false },
    fecha_pago: { type: DataTypes.DATE, allowNull: true },
    estado: {
      type: DataTypes.ENUM('pendiente', 'pagado', 'atrasado'),
      defaultValue: 'pendiente'
    },
    token_ws: { type: DataTypes.STRING, allowNull: true },
    comentario: { type: DataTypes.TEXT, allowNull: true },

    buy_order_custom: { type: DataTypes.STRING(26), allowNull: true } // ✅ NUEVO CAMPO
  }, {
    tableName: 'PagoMensual',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['id_postulacion', 'mes'] // evita duplicados por mes
      }
    ]
  });
};
