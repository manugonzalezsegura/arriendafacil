import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Estadistica } from 'src/app/interfaces/estadistica.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuarioDialogComponent } from 'src/app/components/editar-usuario-dialog/editar-usuario-dialog.component';
import { Usuario } from 'src/app/interfaces/usuario.interface';

import { Propiedad } from 'src/app/interfaces/propiedad.interface';
import { PagoMensual } from 'src/app/interfaces/pago-mensual.interface';
import { CrearAdminComponent } from 'src/app/components/crear-admin/crear-admin.component';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
  standalone: false,
})
export class AdminPanelPage implements OnInit, AfterViewInit { // TAB CONTROL
  vistaSeleccionada: 'usuarios' | 'propiedades' | 'pagos' | 'estadisticas' = 'usuarios';

  // ESTADISTICAS
  displayedColumns: string[] = ['profesion', 'promedio_score', 'promedio_puntualidad'];
  dataSource = new MatTableDataSource<Estadistica>();

  // USUARIOS
  usuariosDisplayedColumns: string[] = ['id_usuario', 'nombre', 'email', 'telefono', 'estado', 'acciones'];
  usuariosDataSource = new MatTableDataSource<Usuario>();

  // PROPIEDADES
  propiedadesDisplayedColumns: string[] = ['id_propiedad', 'titulo', 'direccion', 'precio', 'estado', 'id_usuario', 'acciones'];
  propiedadesDataSource = new MatTableDataSource<Propiedad>();

  // PAGOS
  pagosDisplayedColumns: string[] = ['id_pago_mensual', 'mes', 'monto', 'pagado', 'estado', 'fecha_pago'];
  pagosDataSource = new MatTableDataSource<PagoMensual>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
    this.cargarUsuarios();
    this.cargarPropiedades();
    this.cargarVistaSeleccionada();
    this.cargarPagos(); 
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

    // 👉 Desplegable
  cargarVistaSeleccionada(): void {
    if (this.vistaSeleccionada === 'usuarios') {
      this.cargarUsuarios();
    } else if (this.vistaSeleccionada === 'propiedades') {
      this.cargarPropiedades();
    } else if (this.vistaSeleccionada === 'pagos') {
      this.cargarPagos();
    }
  }

  // Estadísticas
  cargarEstadisticas(): void {
    this.adminService.obtenerEstadisticasAdmin().subscribe({
      next: data => this.dataSource.data = data,
      error: err => console.error('❌ Error al cargar estadísticas:', err)
    });
  }

  // Usuarios
  cargarUsuarios(): void {
    this.adminService.getUsuarios().subscribe({
      next: usuarios => this.usuariosDataSource.data = usuarios,
      error: err => console.error('❌ Error al cargar usuarios:', err)
    });
  }

  applyUsuariosFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.usuariosDataSource.filterPredicate = (data: Usuario, filter: string) => {
      return data.nombre.toLowerCase().includes(filter) ||
             data.email.toLowerCase().includes(filter) ||
             data.telefono?.toLowerCase().includes(filter);
    };
    this.usuariosDataSource.filter = value;
  }

  cambiarEstadoUsuario(usuario: Usuario): void {
    const nuevoEstado = !usuario.esta_activo;
    this.adminService.actualizarUsuario(usuario.id_usuario, { esta_activo: nuevoEstado }).subscribe({
      next: () => this.cargarUsuarios(),
      error: err => console.error('❌ Error al cambiar estado de usuario:', err)
    });
  }

  abrirDialogoEditar(usuario: Usuario): void {
    const dialogRef = this.dialog.open(EditarUsuarioDialogComponent, {
      width: '400px',
      data: { ...usuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.actualizarUsuario(usuario.id_usuario, result).subscribe({
          next: () => this.cargarUsuarios(),
          error: err => console.error('❌ Error al actualizar usuario:', err)
        });
      }
    });
  }

  // Propiedades
  cargarPropiedades(): void {
    this.adminService.getPropiedades().subscribe({
      next: propiedades => this.propiedadesDataSource.data = propiedades,
      error: err => console.error('❌ Error al cargar propiedades:', err)
    });
  }

  applyPropiedadesFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.propiedadesDataSource.filterPredicate = (data: Propiedad, filter: string) =>
      data.titulo.toLowerCase().includes(filter) ||
      data.direccion.toLowerCase().includes(filter) ||
      data.estado.toLowerCase().includes(filter);
    this.propiedadesDataSource.filter = value;
  }

  // Pagos
  cargarPagos(): void {
    this.adminService.getPagos().subscribe({
      next: pagos => this.pagosDataSource.data = pagos,
      error: err => console.error('❌ Error al cargar pagos:', err)
    });
  }

  applyPagosFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.pagosDataSource.filterPredicate = (data: PagoMensual, filter: string) =>
      data.estado.toLowerCase().includes(filter) ||
      data.mes.toLowerCase().includes(filter) ||
      String(data.monto).includes(filter);
    this.pagosDataSource.filter = value;
  }

abrirDialogoCrearAdmin(): void {
  const dialogRef = this.dialog.open(CrearAdminComponent, {
    panelClass: 'dialog-crear-admin'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.cargarUsuarios();
    }
  });

  }

}
