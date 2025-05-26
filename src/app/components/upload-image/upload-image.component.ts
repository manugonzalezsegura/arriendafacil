import { Component,EventEmitter, Output, NgZone  } from '@angular/core';
import { FireUploadService } from 'src/app/services/fire-upload.service';
import { auth } from '../../../firebase-init'; // 🔧 Ajusta ruta según tu estructura
import { getAuth, onAuthStateChanged } from 'firebase/auth';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
  standalone: false,
})
export class UploadImageComponent   {
  selectedFiles: File[] = [];
  cargando: boolean = false;

  @Output() urlsSubidas = new EventEmitter<string[]>();

  constructor(private fireUploadService: FireUploadService, private ngZone: NgZone) {
    console.log('🔧 Componente UploadImage inicializado');
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    console.log('📂 Archivos seleccionados:', this.selectedFiles);
  }

  // ✅ Nuevo método llamado desde el padre (crear-propiedad.page.ts)
  async subirTodas(): Promise<string[]> {
    if (!auth.currentUser) {
      console.error('⛔ No hay sesión activa en Firebase. Abortando subida.');
      throw new Error('Debes iniciar sesión para subir imágenes.');
    }

    if (this.selectedFiles.length === 0) {
      console.warn('⚠️ No hay archivos seleccionados.');
      return [];
    }

    try {
      this.cargando = true;
      const urls = await this.fireUploadService.subirMultiplesImagenes(this.selectedFiles);
      this.ngZone.run(() => {
        this.urlsSubidas.emit(urls); // sigue emitiendo por compatibilidad
      });
      return urls;
    } catch (error) {
      console.error('❌ Error al subir imágenes:', error);
      throw error;
    } finally {
      this.cargando = false;
    }
  }
}
