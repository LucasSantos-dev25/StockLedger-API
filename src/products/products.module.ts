import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './repositories/products.repository';
import { ProductExistsPipe } from './pipes/product-exists.pipe';
import { CategoriesModule } from 'src/categories/categories.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [CategoriesModule],
  controllers: [ProductsController],
  providers: [
    ProductsService, PrismaService,
    { provide: 'IProductsRepository', useClass: ProductsRepository },
    ProductExistsPipe,
  ],
  exports: [ProductsService], 
})
export class ProductsModule {}