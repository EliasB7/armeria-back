import { CloudinaryService } from './../cloudinary/cloudinary.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  NotFoundException,
  UseInterceptors,
  ParseFilePipe,
  UploadedFile,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ItemService } from './items.service';
import { Item } from './schema/items.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemType } from './enums/item-types.enum';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('items')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @Get('allItems')
  async getAllItems() {
    const allitems = await this.itemService.getAll();
    return allitems;
  }

  @Post('createItem')
  @UseInterceptors(FileInterceptor('file'))
  async createItem(
    @Body() createItemDto: CreateItemDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Item> {
    const uploadedPhoto = await this.cloudinary.uploadFile(file);
    createItemDto.image = uploadedPhoto.url;

    const newItem = await this.itemService.createItem(createItemDto);
    return newItem;
  }

  @Get('byBrand/:brand')
  async getItemsByBrand(@Param('brand') brand: string) {
    const items = await this.itemService.getItemsByBrand(brand);
    return items;
  }

  @Get('byCategory/:category')
  async getItemsByCategory(@Param('category') category: ItemType) {
    const items = await this.itemService.getItemsByCategory(category);
    return items;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let uploadedPhoto;

    if (file) {
      uploadedPhoto = await this.cloudinary.uploadFile(file);
      updateItemDto.image = uploadedPhoto.url;
    }

    const updatedItem = await this.itemService.updateItem(id, updateItemDto);
    return updatedItem;
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string) {
    await this.itemService.deleteItem(id);
    return { message: 'Elemento eliminado con éxito' };
  }

  @Get('details/:id')
  async getItemById(@Param('id') id: string) {
    const item = await this.itemService.getItemById(id);

    if (!item) {
      throw new NotFoundException(`El producto con ID ${id} no se encontró.`);
    }

    return item;
  }
}
