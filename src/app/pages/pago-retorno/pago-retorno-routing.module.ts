import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoRetornoPage } from './pago-retorno.page';

const routes: Routes = [
  {
    path: '',
    component: PagoRetornoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoRetornoPageRoutingModule {}
