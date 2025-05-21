//src\app\interfaces\propiedadExtend.interface.ts

import { Propiedad } from './propiedad.interface';

export interface CrearPropiedadDTO extends Partial<Propiedad> {
  descripcion: string;
  tipo_propiedad: 'casa' | 'departamento';
  id_comuna: number;
}