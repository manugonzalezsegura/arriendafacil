// src/firebase-init.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { environment } from './environments/environment';

// ✅ Inicializa la app Firebase solo una vez
const firebaseConfig = {
  ...environment.firebaseConfig,
  storageBucket: 'arriendofacil-53804.firebasestorage.app' // ✅ CORRECTO
};
// ✅ Exporta servicios individuales como funciones puras
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
