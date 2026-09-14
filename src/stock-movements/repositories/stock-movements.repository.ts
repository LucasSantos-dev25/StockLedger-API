import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateMovementInput,
  IStockMovementsRepository,
} from './stock-movements.repository.interface';

@Injectable()
export class StockMovementsRepository implements IStockMovementsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createWithProductUpdate(input: CreateMovementInput) {
    const { productId, userId, type, quantity, reason } = input;
    const quantityDelta = type === 'IN' ? quantity : -quantity;


    const [movement] = await this.prisma.$transaction([
      this.prisma.stockMovement.create({
        data: { productId, userId, type, quantity, reason },
      }),
      this.prisma.product.update({
        where: { id: productId },
        data: { quantity: { increment: quantityDelta } },
      }),
    ]);

    return movement;
  }

  findAll(productId?: string) {
    return this.prisma.stockMovement.findMany({
      where: productId ? { productId } : undefined,
      include: { product: true, user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string) {
    return this.prisma.stockMovement.findUnique({
      where: { id },
      include: { product: true, user: { select: { id: true, name: true, email: true } } },
    });
  }

  findByProductId(productId: string) {
    return this.findAll(productId);
  }
}