import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPropiedadPageRoutingModule } from './crear-propiedad-routing.module';

import { CrearPropiedadPage } from './crear-propiedad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPropiedadPageRoutingModule
  ],
  declarations: [CrearPropiedadPage]
})
export class CrearPropiedadPageModule {}
