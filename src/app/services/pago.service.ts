import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private baseUrl = 'http://localhost:3003/api/payments'; // backend-pay-service

  constructor(private http: HttpClient) {}

  // 🔍 Obtener pagos mensuales de una postulación
  obtenerPagosMensuales(id_postulacion: number) {
  console.log(`📤 Llamando a GET /mensuales/${id_postulacion}`);
  return this.http.get<any[]>(`${this.baseUrl}/mensuales/${id_postulacion}`);
  }

  // 💳 Iniciar pago mensual


  // ✅ Confirmar pago mensual
  confirmarPagoMensual(token_ws: string) {
    console.log(`📤 Llamando a POST /pago/mensual/confirm con token_ws:`, token_ws);
    return this.http.post(`${this.baseUrl}/mensual/confirm`, { token_ws });
  }

  crearPagosMensuales(id_postulacion: number) {
  console.log(`📤 Llamando a POST /pago/mensuales/crear con id_postulacion: ${id_postulacion}`);
  return this.http.post(`${this.baseUrl}/mensuales/crear`, { id_postulacion });
}


iniciarPagoMensual(id_pago_mensual: string) {
  console.log(`📤 Llamando a POST /init con id_pago_mensual:`, id_pago_mensual);
  return this.http.post<any>(`${this.baseUrl}/init`, { id_pago_mensual });
}


  obtenerPagosRecibidos() {
  console.log('📤 Llamando a GET /recibidos');
  return this.http.get<any[]>(`${this.baseUrl}/recibidos`);
  }


}
