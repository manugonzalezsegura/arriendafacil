import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaPropPage } from './busqueda-prop.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaPropPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaPropPageRoutingModule {}
