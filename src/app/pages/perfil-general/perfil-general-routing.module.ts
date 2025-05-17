import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilGeneralPage } from './perfil-general.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilGeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilGeneralPageRoutingModule {}
