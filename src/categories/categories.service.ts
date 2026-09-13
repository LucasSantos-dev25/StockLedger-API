import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { type ICategoriesRepository } from './repositories/categories.repository.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('ICategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async create(dto: CreateCategoryDto) {
    return this.categoriesRepository.create(dto);
  }

  async findAll() {
    return this.categoriesRepository.findAll();
  }

  async findById(id: string) {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Categoria com id ${id} não encontrada`);
    }
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findById(id); 
    return this.categoriesRepository.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);
    return this.categoriesRepository.delete(id);
  }
}