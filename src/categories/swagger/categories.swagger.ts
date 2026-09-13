import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';

export function ApiCreateCategory() {
  return applyDecorators(
    ApiTags('categories'),
    ApiOperation({ summary: 'Cria uma nova categoria' }),
    ApiResponse({ status: 201, description: 'Categoria criada com sucesso' }),
    ApiResponse({ status: 400, description: 'Dados inválidos' }),
  );
}

export function ApiFindAllCategories() {
  return applyDecorators(
    ApiTags('categories'),
    ApiOperation({ summary: 'Lista todas as categorias' }),
    ApiResponse({ status: 200, description: 'Lista de categorias retornada' }),
  );
}

export function ApiFindOneCategory() {
  return applyDecorators(
    ApiTags('categories'),
    ApiParam({ name: 'id', description: 'ID da categoria (UUID)' }),
    ApiOperation({ summary: 'Busca uma categoria por id' }),
    ApiResponse({ status: 200, description: 'Categoria encontrada' }),
    ApiResponse({ status: 404, description: 'Categoria não encontrada' }),
  );
}

export function ApiUpdateCategory() {
  return applyDecorators(
    ApiTags('categories'),
    ApiParam({ name: 'id', description: 'ID da categoria (UUID)' }),
    ApiOperation({ summary: 'Atualiza uma categoria' }),
    ApiResponse({ status: 200, description: 'Categoria atualizada' }),
    ApiResponse({ status: 404, description: 'Categoria não encontrada' }),
  );
}

export function ApiDeleteCategory() {
  return applyDecorators(
    ApiTags('categories'),
    ApiParam({ name: 'id', description: 'ID da categoria (UUID)' }),
    ApiOperation({ summary: 'Remove uma categoria' }),
    ApiResponse({ status: 204, description: 'Categoria removida' }),
    ApiResponse({ status: 404, description: 'Categoria não encontrada' }),
  );
}