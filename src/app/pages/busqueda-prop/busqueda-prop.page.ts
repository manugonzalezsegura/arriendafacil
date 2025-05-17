import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../../services/propiedad.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; // 👈 Asegúrate de importar esto

@Component({
  selector: 'app-busqueda-prop',
  templateUrl: './busqueda-prop.page.html',
  styleUrls: ['./busqueda-prop.page.scss'],
  standalone: false
})
export class BusquedaPropPage implements OnInit {
  
  
  filtros = {
    id_comuna: '',
    id_region: '',
    precio_max: ''
  };

  propiedades: any[] = [];
  regiones: any[] = [];
  comunas: any[] = [];

  constructor(
    private propiedadService: PropiedadService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  verDetalle(id: number) {
  this.router.navigate(['/propiedad', id]);
}

  ngOnInit() {



    console.log('🟢 ngOnInit: cargando regiones...');
    this.propiedadService.getRegiones().subscribe({
      next: (data) => {
        console.log('✅ Regiones recibidas:', data);
        this.regiones = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar regiones:', err);
        this.showToast('Error al cargar regiones');
      }
    });
    
  }

  onRegionChange(event: any) {
    const id_region = event.detail.value;
    console.log('📥 Región seleccionada:', id_region);
  
    this.filtros.id_region = id_region;
    this.filtros.id_comuna = '';
    this.comunas = [];
  
    this.propiedadService.getComunasPorRegion(id_region).subscribe({
      next: (data) => {
        console.log('✅ Comunas recibidas:', data);
        this.comunas = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar comunas:', err);
        this.showToast('Error al cargar comunas');
      }
    });
  }


  
  buscarPropiedades() {
    this.propiedadService.filtrarPropiedades(this.filtros).subscribe({
      next: (data: any) => {
        this.propiedades = data;
        if (data.length === 0) this.showToast('No se encontraron propiedades');
      },
      error: (err) => {
        this.showToast('Error al buscar propiedades');
      }
    });
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
