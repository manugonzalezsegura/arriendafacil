import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropiedadDetallePageRoutingModule } from './propiedad-detalle-routing.module';

import { PropiedadDetallePage } from './propiedad-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropiedadDetallePageRoutingModule
  ],
  declarations: [PropiedadDetallePage]
})
export class PropiedadDetallePageModule {}
