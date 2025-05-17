import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = 'http://localhost:3004/api/perfil-inquilino';

  constructor(private http: HttpClient) {}


  
  // ✅ Si no estás usando interceptor, este método agrega el token manualmente
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    console.log('🔐 getAuthHeaders() - token:', token);   // 👈 Log para verificar si hay token
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // ✅ GET: Traer el esquema de formulario
  async getFormSchema() {
    const url = `${this.apiUrl}/schema`;
    console.log('📄 getFormSchema() - URL:', url);

    try {
      const response = await lastValueFrom(
        this.http.get<any>(url, {
          // Si estás usando interceptor, puedes comentar la siguiente línea:
          headers: this.getAuthHeaders()
        })
      );
      console.log('✅ getFormSchema() - response:', response);
      return response;
    } catch (error) {
      console.error('❌ getFormSchema() - error:', error);
      throw error;
    }
  }

  // ✅ POST: Crear o actualizar perfil
  async crearActualizarPerfil(data: any) {
    console.log('📤 crearActualizarPerfil() - Data enviada:', data);

    try {
      const response = await lastValueFrom(
        this.http.post(this.apiUrl, data, {
          headers: this.getAuthHeaders()
        })
      );
      console.log('✅ crearActualizarPerfil() - response:', response);
      return response;
    } catch (error) {
      console.error('❌ crearActualizarPerfil() - error:', error);
      throw error;
    }
  }

  // ✅ GET: Obtener perfil actual
  async obtenerPerfil() {
    console.log('📥 obtenerPerfil() - URL:', this.apiUrl);

    try {
      const response = await lastValueFrom(
        this.http.get(this.apiUrl, {
          headers: this.getAuthHeaders()
        })
      );
      console.log('✅ obtenerPerfil() - response:', response);
      return response;
    } catch (error) {
      console.error('❌ obtenerPerfil() - error:', error);
      throw error;
    }
  }


}
