import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostulacionesPanelPageRoutingModule } from './postulaciones-panel-routing.module';

import { PostulacionesPanelPage } from './postulaciones-panel.page';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostulacionesPanelPageRoutingModule,
    MatTabsModule,
    MatCardModule,
  ],
  declarations: [PostulacionesPanelPage]
})
export class PostulacionesPanelPageModule {}
