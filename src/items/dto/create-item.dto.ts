import { ItemType } from '../enums/item-types.enum'; // Asegúrate de tener la ruta correcta

export class CreateItemDto {
  name: string;
  brand: string;
  color: string;
  image: string;
  description: string;
  price: number;
  category: ItemType;
  subCategory: string;
  isAvailable: boolean;
  showPrice: boolean;
}
