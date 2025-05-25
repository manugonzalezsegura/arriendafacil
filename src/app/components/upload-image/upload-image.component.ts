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

  async subirImagenes() {
    console.log('🚀 Iniciando proceso de subida...');
    this.cargando = true;

    const user = auth.currentUser;
    if (!user) {
      console.error('⛔ No hay sesión activa en Firebase. Abortando subida.');
      alert('Debes iniciar sesión para subir imágenes.');
      this.cargando = false;
      return;
    }

    console.log('✅ Usuario autenticado en Firebase:', user.uid);

    try {
      const urls = await this.fireUploadService.subirMultiplesImagenes(this.selectedFiles);
      this.ngZone.run(() => {
        console.log('✅ URLs de imágenes subidas:', urls);
        this.urlsSubidas.emit(urls);
      });
    } catch (error) {
      console.error('❌ Error al subir imágenes:', error);
      alert('Ocurrió un error al subir imágenes. Revisa la consola.');
    }

    this.cargando = false;
  }

}
