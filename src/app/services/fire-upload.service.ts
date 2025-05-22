import { Injectable ,NgZone} from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FireUploadService {

  private storage = getStorage(); // ✅ NO se importa Storage, se instancia directo

  constructor(private ngZone: NgZone) {}

  /**
   * 📤 Sube una sola imagen a Firebase y retorna su URL pública
   */
  async subirImagen(file: File, carpeta: string = 'imagenes'): Promise<string> {
    const nombreArchivo = `${carpeta}/${uuidv4()}_${file.name}`;
    const storageRef = ref(this.storage, nombreArchivo);

    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);

    let safeUrl: string;

    this.ngZone.run(() => {
      safeUrl = url;
      console.log('✅ URL subida (NgZone):', safeUrl);
    });

    return safeUrl!;
  }

  /**
   * 📤 Sube varias imágenes a Firebase y retorna un array de URLs
   */
  async subirMultiplesImagenes(files: File[], carpeta: string = 'imagenes'): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
      const url = await this.subirImagen(file, carpeta);
      urls.push(url);
    }

    return urls;
  }
}
