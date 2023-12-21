import { ItemType } from '../enums/item-types.enum'; // Asegúrate de tener la ruta correcta

export class CreateItemDto {
  id: string;
  name: string;
  brand: string;
  model: string;
  color: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  category: ItemType;
  // subCategory: string;
  isAvailable: boolean;
  showPrice: boolean;
}
