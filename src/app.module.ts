import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { StockMovementsModule } from './stock-movements/stock-movements.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true

  }), 
  HealthModule, CategoriesModule, UsersModule, AuthModule, ProductsModule, StockMovementsModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
