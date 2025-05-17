import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisPropiedadesPageRoutingModule } from './mis-propiedades-routing.module';

import { MisPropiedadesPage } from './mis-propiedades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisPropiedadesPageRoutingModule
  ],
  declarations: [MisPropiedadesPage]
})
export class MisPropiedadesPageModule {}
