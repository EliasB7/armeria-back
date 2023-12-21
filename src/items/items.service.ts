import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schema/items.schema';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemType } from './enums/item-types.enum';
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
    const { brand, model, name } = createItemDto;
    const existingItem = await this.itemModel.findOne({ brand, model, name });

    createItemDto.id = this.generateUniqueID();

    if (existingItem) {
      existingItem.quantity += createItemDto.quantity;
      return await existingItem.save();
    }
    const newItem = new this.itemModel(createItemDto);
    return await newItem.save();
  }

  async getItemsByBrand(brand: string): Promise<Item[]> {
    const items = await this.itemModel.find({ brand }).exec();
    return items;
  }

  async getItemsByCategory(category: ItemType): Promise<Item[]> {
    const items = await this.itemModel.find({ category }).exec();
    return items;
  }

  async updateItem(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const existingItem = await this.itemModel.findById(id);

    if (!existingItem) {
      throw new NotFoundException(`El producto con ID ${id} no se encontró.`);
    }

    Object.keys(updateItemDto).forEach((key) => {
      existingItem[key] = updateItemDto[key];
    });

    return await existingItem.save();
  }

  generateUniqueID() {
    const timestamp = new Date().getTime();
    const randomValue = Math.floor(Math.random() * 10000);

    return `${timestamp}${randomValue}`;
  }

  async deleteItem(id: string): Promise<void> {
    const item = await this.itemModel.findById(id);

    if (!item) {
      throw new NotFoundException(`El producto con ID ${id} no se encontró.`);
    }

    await this.itemModel.deleteOne({ _id: id });
  }

  async getItemById(id: string): Promise<Item> {
    const item = await this.itemModel.findOne({ id }).exec();

    return item;
  }
}
