import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ItemService } from './items.service';
import { Item } from './schema/items.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('allItems')
  async getAllItems() {
    const allitems = await this.itemService.getAll();

    return allitems;
  }

  @Post('createItem')
  async createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    try {
      const newItem = await this.itemService.createItem(createItemDto);
      return newItem;
    } catch (error) {
      throw new BadRequestException('Error al crear el ítem.');
    }
  }
}
