// /src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut  } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private apiUrl = 'http://localhost:3000/api/register';// URL del backend

  constructor(private auth: Auth, private http: HttpClient) {}


  async register(email: string, password: string, nombre: string, telefono: string) {
    try {
      // 🔹 1️⃣ Registrar en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
  
      if (user) {
        console.log('✅ Usuario registrado en Firebase:', user.uid);
  
        // 🔹 2️⃣ Guardar los datos en MySQL vía backend y obtener tokens
        const userData = { uid: user.uid, email, nombre, telefono };
        const response: any = await lastValueFrom(this.http.post(this.apiUrl, userData));
  
        // 🔥 Guardar tokens en localStorage
        if (response?.accessToken && response?.refreshToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          console.log('✅ Tokens guardados en localStorage');
        }
  
        return user;
      } else {
        console.log('❌ No se pudo registrar en Firebase');
        return null;
      }
    } catch (error) {
      console.error('❌ Error en el registro:', error);
      return null;
    }
  }
  
   
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
  
      if (user) {
        console.log('✅ Sesión iniciada - UID:', user.uid);
  
        // 🔥 Obtener el idToken de Firebase
        const idToken = await user.getIdToken();
  
        console.log('✅ idToken obtenido:', idToken);
  
        // 🔥 Enviar idToken a tu backend y obtener tu JWT propio
        const response: any = await lastValueFrom(
          this.http.post('http://localhost:3000/api/firebase-login', { idToken })
        );
  
        // 🔥 Guardar el token de tu backend
        if (response?.token) {
          localStorage.setItem('accessToken', response.token);
          console.log('✅ JWT de backend guardado en localStorage');
        }
  
        return user;
      } else {
        console.log('❌ No se pudo iniciar sesión');
        return null;
      }
    } catch (error) {
      console.error('❌ Error en el login:', error);
      return null;
    }
  }



  /**
   * 📌 CERRAR SESIÓN
   */
  async logout() {
    try {
      await signOut(this.auth);
      console.log('✅ Sesión cerrada');
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
    }
  }


  async getFormSchema() {
    return lastValueFrom(this.http.get<any>('http://localhost:3000/api/form-schema'));
  }


}
