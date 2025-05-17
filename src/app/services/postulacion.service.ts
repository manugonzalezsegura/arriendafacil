import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Postulacion } from '../interfaces/postulacion.interface';

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {

  private readonly API_URL = 'http://localhost:3001/postulaciones';

  constructor(private http: HttpClient) {}

  getMisPostulaciones(): Observable<Postulacion[]> {
    console.log('📤 Llamando a GET /mis-postulaciones');
    return this.http.get<Postulacion[]>(`${this.API_URL}/mis-postulaciones`);
  }

  // 📨 Obtener postulaciones recibidas por el propietario
  getPostulacionesRecibidas(): Observable<Postulacion[]> {
    console.log('📤 Llamando a GET /recibidas');
    return this.http.get<Postulacion[]>(`${this.API_URL}/recibidas`);
  }

  // 📝 Postular a una propiedad
  postular(id_propiedad: number): Observable<any> {
    console.log('📤 Llamando a POST /postulaciones con id_propiedad:', id_propiedad);
    return this.http.post('http://localhost:3001/postulaciones', { id_propiedad });
  }

  // ✏️ Actualizar estado de una postulación
  actualizarEstadoPostulacion(id_postulacion: number, estado: 'aceptada' | 'rechazada'): Observable<any> {
    console.log(`📤 Llamando a PUT /postulaciones/${id_postulacion} con estado:`, estado);
    return this.http.put(`${this.API_URL}/${id_postulacion}`, { estado });
  }
}



