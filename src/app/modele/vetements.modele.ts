import { Boutique } from './boutique.model';
import { Image } from './Image.model';
export class Vetement {
  idVet?: number;
  marqueVet?: string;
  prixVet?: number;
  dateAchat?: Date;
  boutique?: Boutique;
  images!: Image[];

  imageStr!: string;
}
