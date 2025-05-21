import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estadistica } from 'src/app/interfaces/estadistica.interface';
import { Usuario } from '../interfaces/usuario.interface';
import { Propiedad } from '../interfaces/propiedad.interface';
import { PagoMensual } from '../interfaces/pago-mensual.interface';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly API_AUTH = 'http://localhost:3000/api/admin';
  private readonly API_PERFIL = 'http://localhost:3004/admin'; // para estadísticas
  private readonly API_PROPIEDADES = 'http://localhost:3001/api/admin';
  private readonly API_PAGOS = 'http://localhost:3003/api/admin';

  constructor(private http: HttpClient) {}

  // 📊 Obtener estadísticas ML (desde profile-service)
  obtenerEstadisticasAdmin(): Observable<Estadistica[]> {
    return this.http.get<Estadistica[]>(`${this.API_PERFIL}/estadisticas`);
  }

  // 👥 Obtener todos los usuarios (desde auth-service)
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_AUTH}/usuarios`);
  }

  // 🗑️ Soft delete usuario (desde auth-service)
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.API_AUTH}/usuarios/${id}`);
  }

  actualizarUsuario(id_usuario: number, data: any) {
  console.log(`📤 Enviando actualización para usuario ID ${id_usuario}`);
  return this.http.put(`${this.API_AUTH}/usuarios/${id_usuario}`, data);
}


// 🏠 Obtener propiedades (desde propiedades-service)
  getPropiedades(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(`${this.API_PROPIEDADES}/propiedades`);
  }

  // ✏️ Actualizar propiedad
  actualizarPropiedad(id_propiedad: number, data: any) {
    console.log(`📤 Enviando actualización para propiedad ID ${id_propiedad}`);
    return this.http.put(`${this.API_PROPIEDADES}/propiedades/${id_propiedad}`, data);
  }

  // 💳 Obtener pagos mensuales (desde pay-service)
  getPagos(): Observable<PagoMensual[]> {
    return this.http.get<PagoMensual[]>(`${this.API_PAGOS}/pagos`);
  }


  obtenerSchemaRegistro() {
  return this.http.get<any>(`${this.API_AUTH}/form-schema/register`);
}

crearUsuarioAdmin(data: any) {
  return this.http.post(`${this.API_AUTH}/usuarios`, data);
}





getFormSchema(): Observable<any> {
  return this.http.get<any>('http://localhost:3000/api/admin/form-schema');
}


}




