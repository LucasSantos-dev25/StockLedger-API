import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export function ApiGetMe() {
  return applyDecorators(
    ApiTags('users'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Retorna dados do usuário autenticado' }),
    ApiResponse({ status: 200, description: 'Usuário retornado com sucesso' }),
    ApiResponse({ status: 401, description: 'Token ausente ou inválido' }),
  );
}

export function ApiFindAllUsers() {
  return applyDecorators(
    ApiTags('users'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Lista todos os usuários (somente ADMIN)' }),
    ApiResponse({ status: 200, description: 'Lista de usuários retornada' }),
    ApiResponse({ status: 403, description: 'Usuário sem permissão' }),
  );
}