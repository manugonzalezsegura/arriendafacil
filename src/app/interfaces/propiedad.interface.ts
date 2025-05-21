export interface Propiedad {
  id_propiedad: number;
  titulo: string;
  direccion: string;
  precio: number;
  estado: 'disponible' | 'arrendada' | 'eliminada';
  id_usuario: number;
}
