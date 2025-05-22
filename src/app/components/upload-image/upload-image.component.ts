import { Component,EventEmitter, Output } from '@angular/core';
import { FireUploadService } from 'src/app/services/fire-upload.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
  standalone: false,
})
export class UploadImageComponent   {
  selectedFiles: File[] = [];
  cargando: boolean = false;

  @Output() urlsSubidas = new EventEmitter<string[]>(); // ✅ Emite URLs al padre

  constructor(private fireUploadService: FireUploadService) {}

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  }

  async subirImagenes() {
    if (this.selectedFiles.length === 0) return;

    this.cargando = true;

    try {
      const urls = await this.fireUploadService.subirMultiplesImagenes(this.selectedFiles);
      this.urlsSubidas.emit(urls); // ✅ Enviamos las URLs al componente padre
    } catch (error) {
      console.error('❌ Error al subir imágenes:', error);
    }

    this.cargando = false;
  }
}
