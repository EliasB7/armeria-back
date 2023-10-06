import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schema/items.schema';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async getAll() {
    return await this.itemModel.find().exec();
  }

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const existingItem = await this.findItemByNameAndSubCategory(
      createItemDto.name,
      createItemDto.subCategory,
    );

    if (existingItem) {
      existingItem.quantity += createItemDto.quantity;
      return await existingItem.save();
    } else {
      const newItem = new this.itemModel(createItemDto);
      return await newItem.save();
    }
  }

  async findItemByNameAndSubCategory(
    name: string,
    subCategory: string,
  ): Promise<Item | null> {
    return await this.itemModel
      .findOne({ name, subCategory: subCategory })
      .exec();
  }
}
