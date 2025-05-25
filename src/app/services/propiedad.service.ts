// src/app/services/propiedad.service.ts

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropiedadConImagenes } from '../interfaces/propiedadImag.interface';


@Injectable({
  providedIn: 'root'
})
export class PropiedadService {



   // Cambia puerto si es otro

  constructor(
    private http: HttpClient
  ) { }

  private apiUrl = 'http://localhost:3001/api/propiedad'; 
  private ubicacionUrl = 'http://localhost:3001/api/ubicacion';

  obtenerSchema() {
    const token = localStorage.getItem('accessToken');

    console.log('🔎 [PropiedadService] Token leído (obtenerSchema):', token);
    console.log('🔎 [PropiedadService] URL final:', `${this.apiUrl}/schema`);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/schema`, { headers });
  }

  guardarPropiedad(datos: any) {
    const token = localStorage.getItem('accessToken');

    console.log('🔎 [PropiedadService] Token leído (guardarPropiedad):', token);
    console.log('🔎 [PropiedadService] URL final:', `${this.apiUrl}`);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, datos, { headers });
  }


filtrarPropiedades(filtros: any) {
  const params = new URLSearchParams();

  if (filtros.id_comuna) params.append('id_comuna', filtros.id_comuna);
  if (filtros.id_region) params.append('id_region', filtros.id_region);
  if (filtros.precio_max) params.append('precio_max', filtros.precio_max);

  const url = `${this.apiUrl}/filtro?${params.toString()}`;

  console.log('🔎 [PropiedadService] URL filtrado:', url);

  return this.http.get<PropiedadConImagenes[]>(url); // ✅ TIPADO correcto
}

  getMisPropiedades(): Observable<any[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.get<any[]>(`${this.apiUrl}/mis-propiedades`, { headers });
  }


  getPropertyById(id: number): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }
  
  actualizarPropiedad(id: number, datos: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    return this.http.put(`${this.apiUrl}/${id}`, datos, { headers });
  }


  getRegiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ubicacionUrl}/regiones`, {
      headers: {}
    });
  }
  
  getComunasPorRegion(id_region: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.ubicacionUrl}/comunas/${id_region}`);
  }


  getPropiedadById(id: number): Observable<any> {
  return this.http.get(`http://localhost:3001/api/propiedad/${id}`);
  }

  //crear propiedad
  obtenerSchemaCrear() {
  return this.http.get('/api/propiedades/schema');
  }

  crearPropiedad(data: any) {
    return this.http.post('/api/propiedades', data);
  }



  guardarImagenesPropiedad(id_propiedad: number, urls: string[]) {
  const token = localStorage.getItem('accessToken');
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      console.log('📦 Enviando POST a backend con:');
      console.log('🆔 ID propiedad:', id_propiedad);
      console.log('🔗 URLs:', urls);

  // Ruta backend esperada: POST /api/propiedad/:id/imagenes
  return this.http.post(
    `http://localhost:3001/api/propiedad/${id_propiedad}/imagenes`,
    { urls },
    { headers }
  );
  }


  getImagenesPropiedad(id: number) {
    return this.http.get<any[]>(`http://localhost:3001/api/propiedad/${id}/imagenes`);
  }

}
