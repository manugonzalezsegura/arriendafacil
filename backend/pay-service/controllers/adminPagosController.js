const { PagoMensual } = require('../models');

exports.getAllPagosMensuales = async (req, res) => {
  try {
    console.log('📥 [ADMIN] getAllPagosMensuales llamado');
    const pagos = await PagoMensual.findAll({
      order: [['mes', 'DESC']]
    });
    console.log(`📊 Pagos encontrados: ${pagos.length}`);
    res.json(pagos);
  } catch (err) {
    console.error('❌ Error en getAllPagosMensuales:', err.message);
    res.status(500).json({ error: 'Error al obtener los pagos mensuales' });
  }
};

exports.updatePagoMensual = async (req, res) => {
  const { id_pago_mensual } = req.params;
  const { monto, estado, pagado, comentario } = req.body;

  try {
    console.log(`🛠️ [ADMIN] updatePagoMensual llamado para ID: ${id_pago_mensual}`);
    const pago = await PagoMensual.findByPk(id_pago_mensual);

    if (!pago) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    await pago.update({ monto, estado, pagado, comentario });

    console.log('✅ Pago actualizado:', pago.toJSON());
    res.json(pago);
  } catch (err) {
    console.error('❌ Error al actualizar el pago:', err.message);
    res.status(500).json({ error: 'Error al actualizar el pago mensual' });
  }
};
