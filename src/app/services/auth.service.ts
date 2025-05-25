// /src/app/services/auth.service.ts

import { Injectable,NgZone  } from '@angular/core';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,getIdToken} from 'firebase/auth';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { auth } from '../../firebase-init'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  
   private apiUrl = 'http://localhost:3000/api/register';

  constructor(private http: HttpClient, private ngZone: NgZone) {
    console.log('🔧 AuthService inicializado');
  }

  async register(email: string, password: string, nombre: string, telefono: string) {
    console.log('📨 Iniciando registro...');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        console.log('✅ Usuario creado en Firebase:', user.uid);

        const userData = { uid: user.uid, email, nombre, telefono };
        console.log('📤 Enviando datos al backend:', this.apiUrl);
        const response: any = await lastValueFrom(this.http.post(this.apiUrl, userData));

        if (response?.accessToken && response?.refreshToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          console.log('✅ Tokens guardados en localStorage');
        }

        return user;
      }

      console.warn('⚠️ No se pudo registrar usuario');
      return null;

    } catch (error) {
      console.error('❌ Error en el registro:', error);
      return null;
    }
  }

  async login(email: string, password: string) {
    console.log('🔐 Iniciando login...');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        console.log('✅ Sesión iniciada - UID:', user.uid);

        const idToken = await getIdToken(user);
        console.log('🪪 idToken obtenido:', idToken);

        const response: any = await lastValueFrom(
          this.http.post('http://localhost:3000/api/firebase-login', { idToken })
        );

        if (response?.token) {
          localStorage.setItem('accessToken', response.token);
          console.log('✅ JWT de backend guardado en localStorage');

          this.ngZone.run(() => {
            console.log('🚀 Redirección segura disponible dentro de NgZone');
            // this.router.navigate(['/perfil-general']);
          });
        }

        return user;
      }

      console.warn('⚠️ Login fallido: usuario no encontrado');
      return null;

    } catch (error) {
      console.error('❌ Error en el login:', error);
      return null;
    }
  }

  async logout() {
    console.log('👋 Cerrando sesión...');
    try {
      await signOut(auth);
      console.log('✅ Sesión cerrada con éxito');
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
    }
  }

  async getFormSchema() {
    console.log('📥 Obteniendo esquema de formulario...');
    return lastValueFrom(this.http.get<any>('http://localhost:3000/api/form-schema'));
  }
}
