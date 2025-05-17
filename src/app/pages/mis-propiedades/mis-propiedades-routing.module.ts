import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisPropiedadesPage } from './mis-propiedades.page';

const routes: Routes = [
  {
    path: '',
    component: MisPropiedadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisPropiedadesPageRoutingModule {}
