import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

export function ApiCreateStockMovement() {
  return applyDecorators(
    ApiTags('stock-movements'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Registra uma movimentação de estoque (entrada ou saída)' }),
    ApiResponse({ status: 201, description: 'Movimentação registrada com sucesso' }),
    ApiResponse({ status: 400, description: 'Saldo insuficiente para saída' }),
    ApiResponse({ status: 404, description: 'Produto não encontrado' }),
  );
}

export function ApiFindAllStockMovements() {
  return applyDecorators(
    ApiTags('stock-movements'),
    ApiBearerAuth(),
    ApiQuery({ name: 'productId', required: false, description: 'Filtra por produto' }),
    ApiOperation({ summary: 'Lista movimentações de estoque' }),
    ApiResponse({ status: 200, description: 'Lista retornada com sucesso' }),
  );
}

export function ApiFindOneStockMovement() {
  return applyDecorators(
    ApiTags('stock-movements'),
    ApiBearerAuth(),
    ApiParam({ name: 'id', description: 'ID da movimentação (UUID)' }),
    ApiOperation({ summary: 'Busca uma movimentação por id' }),
    ApiResponse({ status: 200, description: 'Movimentação encontrada' }),
    ApiResponse({ status: 404, description: 'Movimentação não encontrada' }),
  );
}