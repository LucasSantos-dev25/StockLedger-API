import { StockMovement, MovementType } from 'src/generated/prisma/client';

export interface CreateMovementInput {
  productId: string;
  userId: string;
  type: MovementType;
  quantity: number;
  reason?: string;
}

export interface IStockMovementsRepository {
  createWithProductUpdate(input: CreateMovementInput): Promise<StockMovement>;
  findAll(productId?: string): Promise<StockMovement[]>;
  findById(id: string): Promise<StockMovement | null>;
  findByProductId(productId: string): Promise<StockMovement[]>;
}