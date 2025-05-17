import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // 👈 Asegúrate de importar esto

@Component({
  selector: 'app-perfil-general',
  templateUrl: './perfil-general.page.html',
  styleUrls: ['./perfil-general.page.scss'],
  standalone: false
})
export class PerfilGeneralPage implements OnInit {

  
  constructor(private router: Router) {}

  ngOnInit() {
  }

    logout() {
    console.log('🚪 Cerrando sesión...');
    localStorage.removeItem('accessToken'); // 👈 Elimina token
    this.router.navigate(['/login']);       // 👈 Redirige al login
  }


}
