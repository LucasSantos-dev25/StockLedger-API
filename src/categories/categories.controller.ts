import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiCreateCategory,
  ApiFindAllCategories,
  ApiFindOneCategory,
  ApiUpdateCategory,
  ApiDeleteCategory,
} from './swagger/categories.swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiCreateCategory()
  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoriesService.create(dto);
  }

  @Get()
  @ApiFindAllCategories()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiFindOneCategory()
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findById(id);
  }

  @Patch(':id')
  @ApiUpdateCategory()
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return await this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteCategory()
  async delete(@Param('id') id: string) {
    return await this.categoriesService.delete(id);
  }
}