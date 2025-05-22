// /src/app/services/auth.service.ts

import { Injectable,NgZone  } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut  } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private apiUrl = 'http://localhost:3000/api/register';// URL del backend

  constructor(private auth: Auth, private http: HttpClient, private ngZone: NgZone) {}


  async register(email: string, password: string, nombre: string, telefono: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (user) {
        console.log('✅ Usuario registrado en Firebase:', user.uid);

        const userData = { uid: user.uid, email, nombre, telefono };
        const response: any = await lastValueFrom(this.http.post(this.apiUrl, userData));

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

        const idToken = await user.getIdToken();
        console.log('✅ idToken obtenido:', idToken);

        const response: any = await lastValueFrom(
          this.http.post('http://localhost:3000/api/firebase-login', { idToken })
        );

        if (response?.token) {
          localStorage.setItem('accessToken', response.token);
          console.log('✅ JWT de backend guardado en localStorage');

          // ✅ Encapsular cualquier redirección aquí con NgZone si la agregas más adelante
          this.ngZone.run(() => {
            console.log('🚀 Angular puede redirigir sin perder contexto');
            // this.router.navigate(['/perfil-general']); // ← si agregas redirección aquí
          });
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
