export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  telefono?: string;
}

export interface PerfilInquilino {
  id_usuario: number;
  profesion: string;
  sueldo: number;
  sueldo_pareja?: number;
  dependientes?: number;
  score?: number; 
  Usuario?: Usuario;
}

export interface Propiedad {
  id_propiedad: number;
  titulo: string;
  descripcion: string;
  direccion: string;
  precio: number;
  estado: 'disponible' | 'arrendada' | 'eliminada';
}

export interface Postulacion {
  id_postulacion: number;
  id_usuario: number;
  id_propiedad: number;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
  creada_en: string;

  mensaje?: string; // ← Faltaba
  Usuario?: Usuario; // ← Faltaba
  PerfilInquilino?: PerfilInquilino;
  Propiedad?: Propiedad;
}
