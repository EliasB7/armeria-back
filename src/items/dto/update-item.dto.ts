import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { ItemType } from '../enums/item-types.enum';

export class UpdateItemDto extends PartialType(CreateItemDto) {
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
