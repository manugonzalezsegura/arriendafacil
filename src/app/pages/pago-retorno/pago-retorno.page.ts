import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-pago-retorno',
  templateUrl: './pago-retorno.page.html',
  styleUrls: ['./pago-retorno.page.scss'],
  standalone: false
})
export class PagoRetornoPage implements OnInit {

   estado: 'cargando' | 'exito' | 'error' = 'cargando';

  constructor(
    private route: ActivatedRoute,
    private pagoService: PagoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token_ws');
    if (!token) {
      this.estado = 'error';
      return;
    }

    this.pagoService.confirmarPagoMensual(token).subscribe({
      next: () => {
        this.estado = 'exito';
        setTimeout(() => this.router.navigate(['/postulaciones-panel']), 3000);
      },
      error: () => {
        this.estado = 'error';
        setTimeout(() => this.router.navigate(['/postulaciones-panel']), 4000);
      }
    });
  }

}
