import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut  } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = 'http://localhost:3000/api/register';  // URL del backend

  constructor(private auth: Auth, private http: HttpClient) {}


  async register(email: string, password: string, nombre: string, telefono: string) {
    try {
      // 🔹 1️⃣ Registrar en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (user) {
        console.log('✅ Usuario registrado en Firebase:', user.uid);

        // 🔹 2️⃣ Guardar los datos en MySQL vía backend
        const userData = { uid: user.uid, email, nombre, telefono };
        await lastValueFrom(this.http.post(this.apiUrl, userData));

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
}
