import { ItemType } from '../enums/item-types.enum';

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
  quantity: number = 0;
}
