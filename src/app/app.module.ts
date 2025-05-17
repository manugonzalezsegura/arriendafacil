// src/app/app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; // 👈 Añadir esto


import { environment} from "../environments/environment";

import { provideFirebaseApp, initializeApp } from '@angular/fire/app'; // Firebase initialization
import { provideAuth,getAuth } from '@angular/fire/auth'; // Auth service
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { HttpClientModule, provideHttpClient } from '@angular/common/http'; 
import { NavbarComponent } from './components/navbar/navbar.component';

// para formularios 
import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent  // ✅ Correcto
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule, // 👈 Necesario para routerLink
  ],
  exports: [
    NavbarComponent  // ✅ Necesario para usar <app-navbar>
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
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