import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPropiedadPage } from './crear-propiedad.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPropiedadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPropiedadPageRoutingModule {}
