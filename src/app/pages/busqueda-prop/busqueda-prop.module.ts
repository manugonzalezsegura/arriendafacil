import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaPropPageRoutingModule } from './busqueda-prop-routing.module';

import { BusquedaPropPage } from './busqueda-prop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaPropPageRoutingModule
  ],
  declarations: [BusquedaPropPage]
})
export class BusquedaPropPageModule {}
