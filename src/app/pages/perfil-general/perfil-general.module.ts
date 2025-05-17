import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilGeneralPageRoutingModule } from './perfil-general-routing.module';

import { PerfilGeneralPage } from './perfil-general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilGeneralPageRoutingModule
  ],
  declarations: [PerfilGeneralPage]
})
export class PerfilGeneralPageModule {}
