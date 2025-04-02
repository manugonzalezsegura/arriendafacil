import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {


  email: string = '';
  password: string = '';

  constructor(private auth:AuthService) { }


  ngOnInit() {
  }

  
  async iniciarSesion() {
    if (!this.email || !this.password) {
      console.log('❌ Ingrese un correo y contraseña');
      return;
    }

    try {
      const usuario = await this.auth.login(this.email, this.password);

      if (usuario) {
        console.log('✅ Login exitoso:', usuario.uid);
        // Redireccionar o mostrar mensaje de éxito
      } else {
        console.log('❌ Error en el login');
      }
    } catch (error) {
      console.error('❌ Error en el login:', error);
    }
  }





}
