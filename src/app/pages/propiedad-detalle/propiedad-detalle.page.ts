import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropiedadService } from 'src/app/services/propiedad.service';
import { PostulacionService } from 'src/app/services/postulacion.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-propiedad-detalle',
  templateUrl: './propiedad-detalle.page.html',
  styleUrls: ['./propiedad-detalle.page.scss'],
  standalone: false
})
export class PropiedadDetallePage implements OnInit {

  propiedad: any = {};
  cargando = true;
  
  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService,
    private postulacionService: PostulacionService,
    private toastController: ToastController
  ) {}

ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  console.log('🔍 ID recibido desde ruta:', id);

  this.propiedadService.getPropiedadById(id).subscribe({
    next: (data) => {
      console.log('✅ Propiedad recibida:', data);
      this.propiedad = data;
      this.cargando = false;
    },
    error: (err) => {
      console.error('❌ Error al cargar propiedad:', err);
      this.presentToast('Error al cargar propiedad', 'danger');
    }
  });
}

  postular() {
    this.postulacionService.postular(this.propiedad.id_propiedad).subscribe({
      next: () => {
        this.presentToast('Postulación enviada con éxito ✅', 'success');
      },
      error: (err) => {
        console.error(err);
        const msg = err.error?.error || 'Ya postulaste o hubo un error';
        this.presentToast(msg, 'warning');
      }
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      color,
      position: 'top'
    });
    await toast.present();
  }

}
