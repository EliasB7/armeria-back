import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './items.service';
import { Item } from './schema/items.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('createItem')
  async createItem(@Body() createItemDto: Item) {
    const newItem = await this.itemService.createItem(createItemDto);

    return newItem;
  }
}
