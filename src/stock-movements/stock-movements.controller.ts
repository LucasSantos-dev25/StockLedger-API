import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { StockMovementsService } from './stock-movements.service';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import {
  ApiCreateStockMovement,
  ApiFindAllStockMovements,
  ApiFindOneStockMovement,
} from './swagger/stock-movements.swagger';

@Controller('stock-movements')
@UseGuards(JwtAuthGuard)
export class StockMovementsController {
  constructor(private readonly stockMovementsService: StockMovementsService) {}

  @Post()
  @ApiCreateStockMovement()
  create(
    @Body() dto: CreateStockMovementDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.stockMovementsService.create(dto, user.id);
  }

  @Get()
  @ApiFindAllStockMovements()
  findAll(@Query('productId') productId?: string) {
    return this.stockMovementsService.findAll(productId);
  }

  @Get(':id')
  @ApiFindOneStockMovement()
  findOne(@Param('id') id: string) {
    return this.stockMovementsService.findById(id);
  }
}