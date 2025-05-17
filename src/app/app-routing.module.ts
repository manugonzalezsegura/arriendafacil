import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'propiedad',
    loadChildren: () => import('./pages/propiedad/propiedad.module').then( m => m.PropiedadPageModule)
  },
  {
    path: 'busqueda-prop',
    loadChildren: () => import('./pages/busqueda-prop/busqueda-prop.module').then( m => m.BusquedaPropPageModule)
  },
  {
    path: 'perfil-general',
    loadChildren: () => import('./pages/perfil-general/perfil-general.module').then( m => m.PerfilGeneralPageModule)
  },

    {
    path: 'propiedad/:id',
    loadChildren: () =>
      import('./pages/propiedad-detalle/propiedad-detalle.module').then((m) => m.PropiedadDetallePageModule),
  },
  
  {
    path: 'mis-propiedades',
    loadChildren: () => import('./pages/mis-propiedades/mis-propiedades.module').then( m => m.MisPropiedadesPageModule)
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('./pages/admin-panel/admin-panel.module').then( m => m.AdminPanelPageModule)
  },
  {
    path: 'postulaciones-panel',
    loadChildren: () => import('./pages/postulaciones-panel/postulaciones-panel.module').then( m => m.PostulacionesPanelPageModule)
  },
  {
    path: 'propiedad-detalle',
    loadChildren: () => import('./pages/propiedad-detalle/propiedad-detalle.module').then( m => m.PropiedadDetallePageModule)
  },
  {
    path: 'pago/retorno',
    loadChildren: () => import('./pages/pago-retorno/pago-retorno.module').then( m => m.PagoRetornoPageModule)
  },
  {
    path: 'pago-cancelado',
    loadChildren: () => import('./pages/pago-cancelado/pago-cancelado.module').then( m => m.PagoCanceladoPageModule)
  },
  {
  path: 'pago/cancelado',
  loadChildren: () => import('./pages/pago-cancelado/pago-cancelado.module').then( m => m.PagoCanceladoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
