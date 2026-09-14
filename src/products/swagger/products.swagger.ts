// products/swagger/products.swagger.ts
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

export function ApiCreateProduct() {
  return applyDecorators(
    ApiTags('products'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Cria um novo produto' }),
    ApiResponse({ status: 201, description: 'Produto criado com sucesso' }),
    ApiResponse({ status: 404, description: 'Categoria informada não existe' }),
    ApiResponse({ status: 409, description: 'SKU já cadastrado' }),
  );
}

export function ApiFindAllProducts() {
  return applyDecorators(
    ApiTags('products'),
    ApiOperation({ summary: 'Lista todos os produtos' }),
    ApiResponse({ status: 200, description: 'Lista de produtos retornada' }),
  );
}

export function ApiFindOneProduct() {
  return applyDecorators(
    ApiTags('products'),
    ApiParam({ name: 'id', description: 'ID do produto (UUID)' }),
    ApiOperation({ summary: 'Busca um produto por id' }),
    ApiResponse({ status: 200, description: 'Produto encontrado' }),
    ApiResponse({ status: 404, description: 'Produto não encontrado' }),
  );
}

export function ApiUpdateProduct() {
  return applyDecorators(
    ApiTags('products'),
    ApiBearerAuth(),
    ApiParam({ name: 'id', description: 'ID do produto (UUID)' }),
    ApiOperation({ summary: 'Atualiza dados do produto (não altera quantidade)' }),
    ApiResponse({ status: 200, description: 'Produto atualizado' }),
    ApiResponse({ status: 404, description: 'Produto ou categoria não encontrada' }),
  );
}

export function ApiDeleteProduct() {
  return applyDecorators(
    ApiTags('products'),
    ApiBearerAuth(),
    ApiParam({ name: 'id', description: 'ID do produto (UUID)' }),
    ApiOperation({ summary: 'Remove um produto (somente ADMIN)' }),
    ApiResponse({ status: 204, description: 'Produto removido' }),
    ApiResponse({ status: 403, description: 'Usuário sem permissão' }),
    ApiResponse({ status: 404, description: 'Produto não encontrado' }),
  );
}