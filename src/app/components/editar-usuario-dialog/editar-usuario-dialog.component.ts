import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario-dialog',
  templateUrl: './editar-usuario-dialog.component.html',
  styleUrls: ['./editar-usuario-dialog.component.scss'],
  standalone: false,
})
export class EditarUsuarioDialogComponent   {

  form: FormGroup;
  campos: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditarUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entidad: any, campos: string[] },
    private fb: FormBuilder
  ) {
    this.campos = data.campos;
    const grupo: any = {};
    this.campos.forEach(campo => grupo[campo] = [data.entidad[campo]]);
    this.form = this.fb.group(grupo);
  }

  guardar() {
    this.dialogRef.close(this.form.value);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
