import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {


  email: string = '';
  password: string = '';

  constructor(private auth:AuthService,private router: Router) { }


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
        // No redirigir aquí → el AuthService ya lo hace según el rol
      } else {
        console.log('❌ Error en el login');
      }
    } catch (error) {
      console.error('❌ Error en el login:', error);
    }
  }




}
