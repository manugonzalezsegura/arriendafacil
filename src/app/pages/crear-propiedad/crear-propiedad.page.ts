import { Component, OnInit,NgZone ,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { PropiedadService } from 'src/app/services/propiedad.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { CrearPropiedadDTO } from 'src/app/interfaces/propiedadExtend.interface';
import { UploadImageComponent } from 'src/app/components/upload-image/upload-image.component';

@Component({
  selector: 'app-crear-propiedad',
  templateUrl: './crear-propiedad.page.html',
  styleUrls: ['./crear-propiedad.page.scss'],
   standalone: false
})
export class CrearPropiedadPage implements OnInit {
 @ViewChild(UploadImageComponent) uploadImageComponent!: UploadImageComponent;

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
  imagenesSubidas: string[] = [];

  constructor(
    private propiedadService: PropiedadService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_propiedad = id ? +id : null;
    this.modoEdicion = !!this.id_propiedad;

    this.propiedadService.getRegiones().subscribe({
      next: (res) => (this.regiones = res),
      error: () => this.mostrarToast('Error al cargar regiones')
    });

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

  async crearPropiedad() {
    const datos: CrearPropiedadDTO = {
      ...this.propiedad,
      precio: Number(this.propiedad.precio)
    };

    try {
      if (this.uploadImageComponent) {
        this.imagenesSubidas = await this.uploadImageComponent.subirTodas();
        console.log('📷 URLs listas para guardar:', this.imagenesSubidas);
      }

      if (this.modoEdicion && this.id_propiedad) {
        this.propiedadService.actualizarPropiedad(this.id_propiedad, datos).subscribe({
          next: () => {
            this.mostrarToast('Propiedad actualizada');
            this.guardarImagenesDePropiedad(this.id_propiedad!);
          },
          error: () => this.mostrarToast('Error al actualizar propiedad')
        });
      } else {
        this.propiedadService.guardarPropiedad(datos).subscribe({
          next: (response: any) => {
            this.mostrarToast('Propiedad creada');
            this.guardarImagenesDePropiedad(response.id_propiedad);
          },
          error: () => this.mostrarToast('Error al crear propiedad')
        });
      }
    } catch (error) {
      this.mostrarToast('Error al subir imágenes');
    }
  }

  guardarImagenesDePropiedad(id_propiedad: number) {
    if (this.imagenesSubidas.length === 0) {
      console.warn('⚠️ No hay imágenes para guardar');
      this.router.navigate(['/mis-propiedades']);
      return;
    }

    console.log('📤 Enviando imágenes al backend:', this.imagenesSubidas);
    this.propiedadService.guardarImagenesPropiedad(id_propiedad, this.imagenesSubidas).subscribe({
      next: () => {
        console.log('✅ Imágenes guardadas correctamente');
        this.router.navigate(['/mis-propiedades']);
      },
      error: () => {
        console.error('❌ Error al guardar imágenes');
        this.router.navigate(['/mis-propiedades']);
      }
    });
  }

  async mostrarToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }


}



