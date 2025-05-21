import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../../services/propiedad.service';
import { Router }  from '@angular/router';
@Component({
  selector: 'app-mis-propiedades',
  templateUrl: './mis-propiedades.page.html',
  styleUrls: ['./mis-propiedades.page.scss'],
  standalone: false
})
export class MisPropiedadesPage implements OnInit {

  propiedades: any[] = [];

  constructor(
    private propiedadService: PropiedadService,
    private router: Router
  ) {}

  ngOnInit() {
    this.propiedadService.getMisPropiedades().subscribe({
      next: (data) => this.propiedades = data,
      error: (err) => console.error('Error al cargar propiedades', err)
    });
  }

  editarPropiedad(id: number) {
    this.router.navigate(['/crear-propiedad', id]);
  }

  

}
