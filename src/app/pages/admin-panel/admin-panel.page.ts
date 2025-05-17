import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Estadistica } from 'src/app/interfaces/estadistica.interface';




import { Usuario } from 'src/app/interfaces/usuario.interface';



@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
  standalone: false,
})
export class AdminPanelPage implements OnInit, AfterViewInit {

 // 📊 Estadísticas ML
  displayedColumns: string[] = ['profesion', 'promedio_score', 'promedio_puntualidad'];
  dataSource = new MatTableDataSource<Estadistica>();

  // 👥 Usuarios
  usuariosDisplayedColumns: string[] = ['id_usuario', 'nombre', 'email', 'telefono', 'estado', 'acciones'];
  usuariosDataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
    this.cargarUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // 📊 Obtener estadísticas ML (ahora con Observable)
  cargarEstadisticas(): void {
    this.adminService.obtenerEstadisticasAdmin().subscribe({
      next: (data) => {
        console.log("📊 Estadísticas ML:", data);
        this.dataSource.data = data;
      },
      error: (err) => console.error("❌ Error al cargar estadísticas", err)
    });
  }

  // 👥 Obtener todos los usuarios
  cargarUsuarios(): void {
    this.adminService.getUsuarios().subscribe({
      next: (res) => {
        console.log("👥 Usuarios cargados:", res);
        this.usuariosDataSource.data = res;
      },
      error: (err) => console.error("❌ Error al cargar usuarios", err)
    });
  }

  // 🔍 Filtro en estadísticas
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // 🗑️ Eliminar (soft delete)
  eliminarUsuario(id: number): void {
    if (!confirm('¿Estás seguro de que deseas desactivar este usuario?')) return;

    this.adminService.deleteUsuario(id).subscribe({
      next: () => {
        console.log(`✅ Usuario ID ${id} desactivado`);
        this.cargarUsuarios(); // Actualizar la tabla
      },
      error: (err) => console.error(`❌ Error al desactivar usuario ID ${id}`, err)
    });
  }


}
