import { Propiedad } from './propiedad.interface'; // ajusta la ruta según tu estructura

export interface PropiedadConImagenes extends Propiedad {
  descripcion?: string;
  tipo_propiedad?: string;
  id_comuna?: number;

  imagenes?: string[];

  Comuna?: {
    nombre: string;
    Region?: {
      nombre: string;
    };
  };
}
