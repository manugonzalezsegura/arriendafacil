import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage {

  nombre: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  async registerUser() {
    if (!this.nombre || !this.telefono || !this.email || !this.password) {
      this.showToast('Todos los campos son obligatorios');
      return;
    }

    const user = await this.authService.register(this.email, this.password, this.nombre, this.telefono);

    if (user) {
      this.showToast('✅ Usuario registrado correctamente');
      this.navCtrl.navigateForward('/login'); // Redirigir a login
    } else {
      this.showToast('❌ Error al registrar usuario');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }


}
