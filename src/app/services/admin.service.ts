import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estadistica } from 'src/app/interfaces/estadistica.interface';
import { Usuario } from '../interfaces/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly API_AUTH = 'http://localhost:3000/api/admin';
  private readonly API_PERFIL = 'http://localhost:3004/admin'; // para estadísticas

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

}


