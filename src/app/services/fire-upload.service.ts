import { Injectable ,NgZone} from '@angular/core';
import { storage } from '../../../src/firebase-init'; // 🔧 Ajusta la ruta si es necesario

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class FireUploadService {

  
constructor(private ngZone: NgZone) {
    console.log('🔧 FireUploadService inicializado');
  }

  subirArchivo(nombreArchivo: string, file: File): Promise<string> {
    console.log(`🚀 Iniciando subida del archivo: ${nombreArchivo}`);

    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, nombreArchivo);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`📤 Progreso de subida (${nombreArchivo}): ${progreso.toFixed(2)}%`);
        },
        (error) => {
          console.error(`❌ Error al subir ${nombreArchivo}:`, error);
          this.ngZone.run(() => reject(error));
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            this.ngZone.run(() => {
              console.log(`✅ Subida completada. URL del archivo (${nombreArchivo}):`, downloadURL);
              resolve(downloadURL);
            });
          } catch (err) {
            console.error(`❌ Error al obtener URL para ${nombreArchivo}:`, err);
            this.ngZone.run(() => reject(err));
          }
        }
      );
    });
  }

  async subirMultiplesImagenes(files: File[]): Promise<string[]> {
    console.log(`📁 Subiendo ${files.length} imágenes...`);
    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const nombreArchivo = `imagenes/${Date.now()}_${file.name}`;
      console.log(`📎 Procesando archivo [${i + 1}/${files.length}]: ${file.name}`);
      try {
        const url = await this.subirArchivo(nombreArchivo, file);
        urls.push(url);
        console.log(`✅ Imagen ${i + 1} subida correctamente`);
      } catch (error) {
        console.error(`⚠️ Error al subir imagen ${i + 1}:`, error);
      }
    }

    console.log('📦 Todas las URLs subidas:', urls);
    return urls;
  }


}
