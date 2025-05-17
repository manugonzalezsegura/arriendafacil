import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../../services/propiedad.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-propiedad',
  templateUrl: './propiedad.page.html',
  styleUrls: ['./propiedad.page.scss'],
  standalone: false
})
export class PropiedadPage implements OnInit {

  campos: any[] = [];
  model: any = {};
  propiedadId: number | null = null;

  constructor(
    private propiedadService: PropiedadService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.propiedadId = Number(this.route.snapshot.paramMap.get('id')) || null;

    this.propiedadService.obtenerSchema().subscribe({
      next: (schema: any) => {
        this.campos = this.schemaToCampos(schema);

        if (this.propiedadId) {
          this.cargarDatosPropiedad(this.propiedadId);
        }
      },
      error: (err) => {
        console.error('❌ Error al obtener schema:', err);
      }
    });
  }

  schemaToCampos(schema: any) {
    const campos = [];
    for (const key in schema.properties) {
      campos.push({
        nombre: key,
        tipo: schema.properties[key].type === 'number' ? 'number' : 'text',
        requerido: schema.required?.includes(key) || false
      });
    }
    return campos;
  }

  cargarDatosPropiedad(id: number) {
    this.propiedadService.getPropertyById(id).subscribe({
      next: (data) => {
        this.model = data;
      },
      error: (err) => {
        this.showToast('Error al cargar propiedad');
        console.error('❌ Error al cargar propiedad:', err);
      }
    });
  }

  guardarPropiedad() {
    if (this.propiedadId) {
      this.propiedadService.actualizarPropiedad(this.propiedadId, this.model).subscribe({
        next: () => this.showToast('Propiedad actualizada'),
        error: (err) => this.showToast('Error al actualizar')
      });
    } else {
      this.propiedadService.guardarPropiedad(this.model).subscribe({
        next: () => this.showToast('Propiedad creada'),
        error: (err) => this.showToast('Error al crear')
      });
    }
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
