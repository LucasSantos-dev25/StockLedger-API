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
  UseGuards,
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @ApiUpdateCategory()
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return await this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteCategory()
  async delete(@Param('id') id: string) {
    return await this.categoriesService.delete(id);
  }
}