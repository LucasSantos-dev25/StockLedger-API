import { Category } from 'src/generated/prisma/client';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export interface ICategoriesRepository {
  create(data: CreateCategoryDto): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  update(id: string, data: UpdateCategoryDto): Promise<Category>;
  delete(id: string): Promise<void>;
}