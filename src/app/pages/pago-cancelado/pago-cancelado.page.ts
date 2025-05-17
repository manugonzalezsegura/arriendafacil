import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pago-cancelado',
  templateUrl: './pago-cancelado.page.html',
  styleUrls: ['./pago-cancelado.page.scss'],
  standalone: false
})
export class PagoCanceladoPage implements OnInit {

  constructor(private router: Router) {}

   ngOnInit(): void {
    setTimeout(() => this.router.navigate(['/postulaciones-panel']), 4000);
  }

}
