import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type IProductsRepository } from './repositories/products.repository.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('IProductsRepository')
    private readonly productsRepository: IProductsRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(dto: CreateProductDto) {
    await this.categoriesService.findById(dto.categoryId);

    const existingSku = await this.productsRepository.findBySku(dto.sku);
    if (existingSku) {
      throw new ConflictException(`SKU "${dto.sku}" já está em uso`);
    }

    return this.productsRepository.create(dto);
  }

  async findAll() {
    return this.productsRepository.findAll();
  }

  async findById(id: string) {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Produto com id ${id} não encontrado`);
    }
    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findById(id);

    if (dto.categoryId) {
      await this.categoriesService.findById(dto.categoryId);
    }

    return this.productsRepository.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);
    return this.productsRepository.delete(id);
  }
}