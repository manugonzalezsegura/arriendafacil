import { Component, OnInit,NgZone  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { PropiedadService } from 'src/app/services/propiedad.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { CrearPropiedadDTO } from 'src/app/interfaces/propiedadExtend.interface';

@Component({
  selector: 'app-crear-propiedad',
  templateUrl: './crear-propiedad.page.html',
  styleUrls: ['./crear-propiedad.page.scss'],
   standalone: false
})
export class CrearPropiedadPage implements OnInit {
 propiedad: CrearPropiedadDTO = {
    titulo: '',
    descripcion: '',
    direccion: '',
    precio: 0,
    tipo_propiedad: 'departamento',
    id_comuna: 0
  };

  regiones: any[] = [];
  comunas: any[] = [];
  id_region = 0;
  id_propiedad: number | null = null;
  modoEdicion = false;


    // ✅ Para almacenar URLs de imágenes subidas
    imagenesSubidas: string[] = [];


  constructor(
    private propiedadService: PropiedadService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private router: Router,
     private ngZone: NgZone,
  ) {}

  ngOnInit() {
    // Leer ID desde la URL
    const id = this.route.snapshot.paramMap.get('id');
    this.id_propiedad = id ? +id : null;
    this.modoEdicion = !!this.id_propiedad;

    // Cargar regiones
    this.propiedadService.getRegiones().subscribe({
      next: (res) => (this.regiones = res),
      error: () => this.mostrarToast('Error al cargar regiones')
    });

    // Si estamos editando, cargar la propiedad
    if (this.modoEdicion) {
      this.propiedadService.getPropertyById(this.id_propiedad!).subscribe({
        next: (data) => {
          this.propiedad = {
            titulo: data.titulo,
            descripcion: data.descripcion,
            direccion: data.direccion,
            precio: data.precio,
            tipo_propiedad: data.tipo_propiedad,
            id_comuna: data.id_comuna
          };
          // Cargar comuna asociada
          this.id_region = data.Comuna?.id_region || 0;
          if (this.id_region) {
            this.propiedadService.getComunasPorRegion(this.id_region).subscribe({
              next: (comunas) => (this.comunas = comunas)
            });
          }
        },
        error: () => this.mostrarToast('Error al cargar propiedad')
      });
    }
  }

  onRegionChange(event: any) {
    const id = event.detail.value;
    this.id_region = id;
    this.propiedad.id_comuna = 0;
    this.comunas = [];

    this.propiedadService.getComunasPorRegion(id).subscribe({
      next: (res) => (this.comunas = res),
      error: () => this.mostrarToast('Error al cargar comunas')
    });
  }


    onUrlsRecibidas(urls: string[]) {
    console.log('✅ URLs recibidas desde upload-image:', urls);
    this.imagenesSubidas = urls;
    }


    crearPropiedad() {
    const datos: CrearPropiedadDTO = {
      ...this.propiedad,
      precio: Number(this.propiedad.precio)
    };

    if (this.modoEdicion && this.id_propiedad) {
      this.propiedadService.actualizarPropiedad(this.id_propiedad, datos).subscribe({
        next: () => {
          this.mostrarToast('Propiedad actualizada');
          this.router.navigate(['/mis-propiedades']);
        },
        error: () => this.mostrarToast('Error al actualizar propiedad')
      });
    } else {
      this.propiedadService.guardarPropiedad(datos).subscribe({
        next: (response: any) => {
          this.mostrarToast('Propiedad creada');
          this.guardarImagenesDePropiedad(response.id_propiedad); 
          this.router.navigate(['/mis-propiedades']);
        },
        error: () => this.mostrarToast('Error al crear propiedad')
      });
    }
  }

  async mostrarToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }


 guardarImagenesDePropiedad(id_propiedad: number) {
  if (this.imagenesSubidas.length === 0) {
    this.router.navigate(['/mis-propiedades']);
    return;
  }

  this.propiedadService
    .guardarImagenesPropiedad(id_propiedad, this.imagenesSubidas)
    .subscribe({
      next: () => {
        console.log('✅ Imágenes guardadas correctamente');
        this.router.navigate(['/mis-propiedades']); // ✅ Solo redirige aquí
      },
      error: () => {
        console.error('❌ Error al guardar imágenes');
        this.router.navigate(['/mis-propiedades']); // ✅ Incluso si falla, se redirige igual
      }
    });
}


}



