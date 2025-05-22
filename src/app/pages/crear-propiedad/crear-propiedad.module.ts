import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPropiedadPageRoutingModule } from './crear-propiedad-routing.module';
import { UploadImageComponent } from 'src/app/components/upload-image/upload-image.component';

import { CrearPropiedadPage } from './crear-propiedad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPropiedadPageRoutingModule,
    
  ],
  declarations: [CrearPropiedadPage,UploadImageComponent]
})
export class CrearPropiedadPageModule {}
