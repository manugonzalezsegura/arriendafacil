import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment} from "../environments/environment";

import { provideFirebaseApp, initializeApp } from '@angular/fire/app'; // Firebase initialization
import { provideAuth,getAuth } from '@angular/fire/auth'; // Auth service
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { HttpClientModule, provideHttpClient } from '@angular/common/http'; 



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule // Se importa en imports para que HttpClient esté disponible en la app
  ],
  providers: [
    // Coloca los proveedores de Firebase aquí según las instrucciones que sigues
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}