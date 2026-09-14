import { Module, forwardRef } from '@nestjs/common';
import { StockMovementsController } from './stock-movements.controller';
import { StockMovementsService } from './stock-movements.service';
import { StockMovementsRepository } from './repositories/stock-movements.repository';
import { ProductsModule } from 'src/products/products.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [forwardRef(() => ProductsModule), PrismaModule],
  controllers: [StockMovementsController],
  providers: [
    StockMovementsService,
    { provide: 'IStockMovementsRepository', useClass: StockMovementsRepository },
  ],
  exports: [StockMovementsService],
})
export class StockMovementsModule {}