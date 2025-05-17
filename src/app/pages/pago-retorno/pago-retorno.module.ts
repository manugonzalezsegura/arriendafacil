import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoRetornoPageRoutingModule } from './pago-retorno-routing.module';

import { PagoRetornoPage } from './pago-retorno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoRetornoPageRoutingModule
  ],
  declarations: [PagoRetornoPage]
})
export class PagoRetornoPageModule {}
