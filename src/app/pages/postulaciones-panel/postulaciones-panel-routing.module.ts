import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostulacionesPanelPage } from './postulaciones-panel.page';

const routes: Routes = [
  {
    path: '',
    component: PostulacionesPanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostulacionesPanelPageRoutingModule {}
