import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductExistsPipe } from './pipes/product-exists.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { StockMovementsService } from 'src/stock-movements/stock-movements.service';
import {
  ApiCreateProduct,
  ApiFindAllProducts,
  ApiFindOneProduct,
  ApiUpdateProduct,
  ApiDeleteProduct,
} from './swagger/products.swagger';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly stockMovementsService: StockMovementsService, 

  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreateProduct()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @ApiFindAllProducts()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiFindOneProduct()
  findOne(@Param('id', ProductExistsPipe) id: string) {
    return this.productsService.findById(id);
  }

  @Get(':id/movements')
  @UseGuards(JwtAuthGuard)
  findMovements(@Param('id', ProductExistsPipe) id: string) {
    return this.stockMovementsService.findByProduct(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiUpdateProduct()
  update(
    @Param('id', ProductExistsPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteProduct()
  delete(@Param('id', ProductExistsPipe) id: string) {
    return this.productsService.delete(id);
  }
}