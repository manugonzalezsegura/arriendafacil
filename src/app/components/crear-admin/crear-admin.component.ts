import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-admin',
  templateUrl: './crear-admin.component.html',
  styleUrls: ['./crear-admin.component.scss'],
  standalone: false,
})
export class CrearAdminComponent  implements OnInit {

  campos: any[] = [];
  model: any = {};

  constructor(private adminService: AdminService, private dialogRef: MatDialogRef<CrearAdminComponent>) {}

  ngOnInit(): void {
    this.adminService.getFormSchema().subscribe(schema => {
      this.campos = Object.entries(schema.properties).map(([key, val]: any) => ({
        nombre: key,
        tipo: val.format === 'email' ? 'email' : 'text',
        requerido: schema.required.includes(key)
      }));
    });
  }

crearAdmin() {
  if (!this.model?.email || !this.model?.nombre || !this.model?.password) {
    console.warn('⚠️ Formulario incompleto. No se envía nada.');
    return;
  }

  this.adminService.crearUsuarioAdmin(this.model).subscribe({
    next: () => {
      alert('✅ Usuario admin creado');
      this.dialogRef.close(true); // ✅ Cierra el diálogo y pasa un flag
    },
    error: (err) => console.error('❌ Error al crear admin:', err)
  });
}


}
