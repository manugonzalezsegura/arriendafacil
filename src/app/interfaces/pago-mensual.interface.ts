export interface PagoMensual {
  id_pago_mensual: string;
  id_postulacion: number;
  mes: string; // o Date si prefieres tipado más estricto
  monto: number;
  pagado: boolean;
  fecha_pago: string | null; // null si no está pagado
  estado: 'pendiente' | 'pagado' | 'atrasado';
  token_ws: string | null;
  comentario: string | null;
}
