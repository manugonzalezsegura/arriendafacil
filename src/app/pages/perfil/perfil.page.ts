import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {

  model: any = {};
  campos: any[] = [];


  constructor(
    private perfilService: PerfilService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}


  async ngOnInit() {
    const schema = await this.perfilService.getFormSchema();

    this.campos = Object.entries(schema.properties).map(([key, value]: [string, any]) => ({
      nombre: key,
      tipo: value.type === 'number' ? 'number' : 'text',
      requerido: schema.required?.includes(key) || false
    }));

    try {
      const perfil = await this.perfilService.obtenerPerfil();
      if (perfil) {
        this.model = perfil;
      }
    } catch {
      console.log('No hay perfil creado todavía');
    }
  }


  async guardarPerfil() {
    const formData = { ...this.model };
    console.log('📤 Datos perfil:', formData);

    const response = await this.perfilService.crearActualizarPerfil(formData);
    if (response) {
      this.showToast('✅ Perfil guardado correctamente');
    } else {
      this.showToast('❌ Error al guardar perfil');
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
