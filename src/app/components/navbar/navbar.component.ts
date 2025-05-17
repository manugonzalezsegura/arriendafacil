import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false,
})
export class NavbarComponent  implements OnInit {

  

  ngOnInit() {}
  mostrarBarra = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const ocultarEn = ['/login', '/registro'];
        this.mostrarBarra = !ocultarEn.includes(event.urlAfterRedirects);
      }
    });
  }
}
