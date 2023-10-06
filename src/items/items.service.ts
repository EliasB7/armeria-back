import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schema/items.schema';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async createItem(createItemDto: Item): Promise<Item> {
    const newItem = new this.itemModel(createItemDto);
    return await newItem.save();
  }
}
