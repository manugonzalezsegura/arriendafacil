// /backend/pay-service/controllers/payment.controller.js

// 1️⃣ — IMPORTACIONES
const { WebpayPlus } = require('transbank-sdk');
const { IntentoPago, Usuario ,Postulacion, Propiedad, PagoMensual} = require('../models'); // Modelos compartidos (shared-models)
const { transbank } = require('../config/env');
const { publish } = require('../utils/rabbitmq'); // Utilidad para publicar eventos
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
// 2️⃣ — CONFIGURAR CLIENTE DE TRANSBANK (WebpayPlus)
const txClient = new WebpayPlus.Transaction();
console.log('✅ Cliente WebpayPlus.Transaction creado');







// ——— 2. CONFIRMAR PAGO ———
exports.confirmPayment = async (req, res) => {
  try {
    const { token_ws } = req.body;

    console.log('📥 confirmPayment:', { token_ws });

    const result = await txClient.commit(token_ws);

    if (result.response_code !== 0) {
      await IntentoPago.update({ estado: 'failed' }, { where: { token_ws } });
      return res.status(400).json({ error: 'Pago rechazado por Transbank' });
    }

    const intent = await IntentoPago.findOne({ where: { token_ws } });
    if (!intent) return res.status(404).json({ error: 'Intento de pago no encontrado' });

    intent.estado = 'success';
    await intent.save();

    // ✅ Buscar la postulación asociada
    const postulacion = await Postulacion.findByPk(intent.id_postulacion);
    if (!postulacion) return res.status(404).json({ error: 'Postulación no encontrada' });

    // ✅ Marcar la postulación como pagada
    postulacion.pagado = true;
    postulacion.fecha_pago = new Date();
    await postulacion.save();

    console.log('✅ Postulación marcada como pagada');

    // ✅ Buscar propiedad para obtener el monto mensual
    const propiedad = await Propiedad.findByPk(postulacion.id_propiedad);
    if (!propiedad) return res.status(404).json({ error: 'Propiedad no encontrada' });

    const montoMensual = parseInt(propiedad.precio);

    // ✅ Generar 12 pagos mensuales a partir del mes siguiente
    const pagos = [];
    const startDate = new Date(); // fecha actual
    startDate.setMonth(startDate.getMonth() + 1); // mes siguiente

    for (let i = 0; i < 12; i++) {
      const mes = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);

      pagos.push({
        id_postulacion: postulacion.id_postulacion,
        mes: mes.toISOString().split('T')[0], // formato YYYY-MM-01
        monto: montoMensual,
        estado: 'pendiente',
        pagado: false,
        fecha_pago: null,
        comentario: null,
        token_ws: null
      });
    }

    await PagoMensual.bulkCreate(pagos);
    console.log('✅ 12 pagos mensuales generados');

    // ✅ Obtener usuario para el evento
    const usuario = await Usuario.findByPk(intent.id_usuario);

    await publish('pago.confirmado', {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      monto: intent.monto,
      fecha: new Date().toISOString(),
      metodo: intent.proveedor
    });

    res.json({ message: 'Pago confirmado y pagos mensuales generados' });

  } catch (err) {
    console.error('❌ Error confirmando el pago:', err);
    res.status(500).json({ error: 'Error al confirmar el pago' });
  }

  
};




exports.getPagosMensuales = async (req, res) => {
  try {
    const { id_postulacion } = req.params;

    // Verificar que la postulación existe (opcional pero recomendado)
    const postulacion = await Postulacion.findByPk(id_postulacion);
    if (!postulacion) {
      return res.status(404).json({ error: 'Postulación no encontrada' });
    }

    const pagos = await PagoMensual.findAll({
      where: { id_postulacion },
      order: [['mes', 'ASC']]
    });

    res.json(pagos);
  } catch (err) {
    console.error('❌ Error al obtener pagos mensuales:', err);
    res.status(500).json({ error: 'Error al obtener pagos mensuales' });
  }
};




exports.initPagoMensual = async (req, res) => {
  const { id_pago_mensual } = req.body;
  console.log(`📤 Recibida solicitud para iniciar pago mensual ID: ${id_pago_mensual}`);

  try {
    const pago = await PagoMensual.findByPk(id_pago_mensual, {
      include: {
        model: Postulacion,
        include: [Propiedad]
      }
    });

    if (!pago) {
      console.warn('⚠️ Pago mensual no encontrado');
      return res.status(404).json({ error: 'Pago mensual no encontrado' });
    }

    if (pago.estado !== 'pendiente') {
      console.warn(`⚠️ Pago mensual en estado inválido: ${pago.estado}`);
      return res.status(400).json({ error: 'Este mes ya fue pagado o está en estado no válido' });
    }

    const monto = Number(pago.monto); // Transbank requiere un número real
    const buyOrder = String(pago.buy_order_custom || '').trim(); // obligatorio
    const sessionId = `sess-${uuidv4()}`; // obligatorio

    const id_usuario = pago.Postulacion.id_usuario;

    if (!buyOrder) {
      console.error('❌ buyOrder está vacío o no válido');
      return res.status(500).json({ error: 'Buy order inválido o no presente' });
    }

    if (!monto || isNaN(monto)) {
      console.error('❌ Monto inválido:', monto);
      return res.status(400).json({ error: 'Monto no válido para Transbank' });
    }

    console.log('🧾 Usando buyOrder desde BD:', buyOrder);
    console.log('💰 Monto:', monto);
    console.log('👤 Usuario:', id_usuario);
    console.log('✅ Validación final');
    console.log('🔢 typeof monto:', typeof monto, 'valor:', monto);
    console.log('🔠 typeof buyOrder:', typeof buyOrder, 'valor:', buyOrder);

    // ✅ NO incluyas token_ws aquí, Transbank lo agrega automáticamente
    const returnUrl = process.env.PAYMENT_RETURN_URL;

    const response = await txClient.create(
      buyOrder,
      sessionId,
      monto,
      returnUrl
    );

    pago.token_ws = response.token;
    await pago.save();

    console.log('✅ Transacción iniciada con éxito, token:', response.token);

    res.json({
      token: response.token,
      url: response.url
    });

  } catch (err) {
    console.error('❌ Error al iniciar pago mensual:', err);
    res.status(500).json({ error: 'Error iniciando pago mensual' });
  }
};







exports.confirmPagoMensual = async (req, res) => {
  try {
    const { token_ws } = req.body;

    console.log('📥 confirmPagoMensual:', { token_ws });

    const result = await txClient.commit(token_ws);
    console.log('📥 Resultado de Transbank:', result);
    if (result.response_code !== 0) {
      return res.status(400).json({ error: 'Pago rechazado por Transbank' });
    }

    const pago = await PagoMensual.findOne({ where: { token_ws } });

    if (!pago) {
      return res.status(404).json({ error: 'Pago mensual no encontrado' });
    }

    pago.estado = 'pagado';
    pago.pagado = true;
    pago.fecha_pago = new Date();
    await pago.save();

    console.log('✅ Pago mensual confirmado para:', pago.mes);

    res.json({ message: 'Pago mensual confirmado con éxito' });

  } catch (err) {
    console.error('❌ Error al confirmar pago mensual:', err);
    res.status(500).json({ error: 'Error al confirmar pago mensual' });
    
  }
  
};






exports.crearPagosMensuales = async (req, res) => {
  try {
    const { id_postulacion } = req.body;
    console.log(`📥 Solicitud para crear pagos mensuales para postulación ${id_postulacion}`);

    // 1. Buscar la postulación
    const postulacion = await Postulacion.findByPk(id_postulacion);
    if (!postulacion) {
      console.warn('⚠️ Postulación no encontrada');
      return res.status(404).json({ error: 'Postulación no encontrada' });
    }

    // 2. Buscar la propiedad asociada para obtener el precio
    const propiedad = await Propiedad.findByPk(postulacion.id_propiedad);
    if (!propiedad) {
      console.warn('⚠️ Propiedad no encontrada');
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }

    const monto = parseInt(propiedad.precio);
    const pagos = [];

    for (let i = 0; i < 12; i++) {
      const mes = moment().add(i + 1, 'months').startOf('month').format('YYYY-MM-DD');
      const id_pago_mensual = uuidv4();
      const buy_order_custom = `PM-${id_pago_mensual.slice(0, 8)}`;

      pagos.push({
        id_pago_mensual,
        id_postulacion,
        mes,
        monto,
        pagado: false,
        estado: 'pendiente',
        token_ws: null,
        comentario: null,
        buy_order_custom
      });

      console.log(`📅 Pago creado - mes: ${mes}, id: ${id_pago_mensual}, buyOrder: ${buy_order_custom}`);
    }

    await PagoMensual.bulkCreate(pagos);
    console.log(`✅ 12 pagos mensuales creados para postulación ${id_postulacion}`);
    res.json({ message: 'Pagos mensuales creados exitosamente' });

  } catch (err) {
    console.error('❌ Error al crear pagos mensuales:', err);
    res.status(500).json({ error: 'Error al crear pagos mensuales' });
  }
};





exports.getPagosRecibidos = async (req, res) => {
  try {
    const id_usuario_arrendador = req.user.id_usuario;

    console.log(`📥 Buscando pagos recibidos para arrendador ID: ${id_usuario_arrendador}`);

    const propiedades = await Propiedad.findAll({
      where: { id_usuario: id_usuario_arrendador },
      include: {
        model: Postulacion,
        include: [
          {
            model: Usuario,
            attributes: ['nombre']
          },
          {
            model: PagoMensual,
            separate: true,
            order: [['mes', 'ASC']]
          }
        ]
      }
    });

    const resultado = propiedades.map((prop) => ({
      propiedad: prop.titulo,
      pagos: prop.Postulacions.flatMap((post) =>
        post.PagoMensuals.map((pago) => ({
          inquilino: post.Usuario?.nombre || 'Desconocido',
          mes: pago.mes,
          estado: pago.estado,
          monto: pago.monto
        }))
      )
    }));

    console.log('✅ Pagos agrupados por propiedad enviados');
    res.json(resultado);

  } catch (err) {
    console.error('❌ Error al obtener pagos recibidos por arrendador:', err);
    res.status(500).json({ error: 'Error al obtener pagos recibidos' });
  }
};

