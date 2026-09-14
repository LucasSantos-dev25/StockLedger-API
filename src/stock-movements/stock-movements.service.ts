import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  type IStockMovementsRepository,
} from './repositories/stock-movements.repository.interface';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class StockMovementsService {
  constructor(
    @Inject('IStockMovementsRepository')
    private readonly stockMovementsRepository: IStockMovementsRepository,
    private readonly productsService: ProductsService,
  ) {}

  async create(dto: CreateStockMovementDto, userId: string) {
    const product = await this.productsService.findById(dto.productId);

    if (dto.type === 'OUT' && product.quantity < dto.quantity) {
      throw new BadRequestException(
        `Saldo insuficiente. Disponível: ${product.quantity}, solicitado: ${dto.quantity}`,
      );
    }

    return this.stockMovementsRepository.createWithProductUpdate({
      ...dto,
      userId,
    });
  }

  async findAll(productId?: string) {
    return this.stockMovementsRepository.findAll(productId);
  }

  async findById(id: string) {
    return this.stockMovementsRepository.findById(id);
  }

  async findByProduct(productId: string) {
    await this.productsService.findById(productId);
    return this.stockMovementsRepository.findByProductId(productId);
  }
}