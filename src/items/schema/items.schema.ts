import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ItemType,
  SubCategoryGuns,
  SubCategoryGunsShort,
  SubCategoryGunsLarge,
  SubCategoryGunsBarrel,
  SubcategoryClothes,
} from '../enums/item-types.enum';

@Schema()
export class Item extends Document {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  brand: string;

  @Prop()
  color: string;

  @Prop()
  model: string;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  quantity: number;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ enum: Object.values(ItemType) })
  category: ItemType;

  // @Prop({
  //   type: [{ type: String }],
  //   enum: [
  //     ...Object.values(SubCategoryGuns),
  //     ...Object.values(SubCategoryGunsShort),
  //     ...Object.values(SubCategoryGunsLarge),
  //     ...Object.values(SubCategoryGunsBarrel),
  //     ...Object.values(SubcategoryClothes),
  //   ],
  // })
  // // subCategory: string[];
  @Prop()
  isAvailable: boolean;

  @Prop()
  showPrice: boolean;

  @Prop()
  isUsed: boolean;

  isInOffer: boolean;

  @Prop()
  compositeKey: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
