// /src/app/pages/registro.page.ts

import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController, ToastController } from '@ionic/angular';

// importaciones para el formulario 




@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit{


 
  model: any = {};

  campos: any[] = [];



  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}


  async ngOnInit() {
    const schema = await this.authService.getFormSchema();
  
    // 🔥 Convertir el schema a un array de campos
    this.campos = Object.entries(schema.properties).map(([key, value]: [string, any]) => ({
      nombre: key,
      tipo: key.includes('password') ? 'password' : (value.format || 'text'),
      requerido: schema.required?.includes(key) || false
    }));
  }



  async registerUser() {
    const formData = { ...this.model };
  
    // 👇 Aquí va el console.log:
    console.log('📤 Datos enviados al registro:', formData);
  
    if (!formData.nombre || !formData.email || !formData.password) {
      this.showToast('Faltan datos requeridos');
      return;
    }
  
    const user = await this.authService.register(
      formData.email,
      formData.password,
      formData.nombre,
      formData.telefono || ''
    );
  
    if (user) {
      this.showToast('✅ Usuario registrado correctamente');
      this.navCtrl.navigateForward('/login');
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


//npm install @ngx-formly/core@6 @ngx-formly/ionic@6