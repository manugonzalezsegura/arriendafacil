// src/app/app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; // 👈 Añadir esto

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';




import { HttpClientModule, provideHttpClient } from '@angular/common/http'; 
import { NavbarComponent } from './components/navbar/navbar.component';

// para formularios 
import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { EditarUsuarioDialogComponent } from './components/editar-usuario-dialog/editar-usuario-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; // <-- 👈 Importa esto








@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,  
    EditarUsuarioDialogComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule, // 👈 Necesario para routerLink
    MatDialogModule, // asegúrate de importar esto también
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    
   

  ],
  exports: [
    NavbarComponent,  // ✅ Necesario para usar <app-navbar>
    
  ],
  providers: [
    

    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}