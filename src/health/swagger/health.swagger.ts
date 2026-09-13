// health/swagger/health.swagger.ts
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export function ApiCheckHealth() {
  return applyDecorators(
    ApiTags('health'),
    ApiOperation({
      summary: 'Verifica a saúde da aplicação',
      description:
        'Retorna o status da API e da conexão com o banco de dados. Não requer autenticação.',
    }),
    ApiResponse({
      status: 200,
      description: 'Aplicação saudável',
      schema: {
        example: {
          status: 'ok',
          info: { database: { status: 'up' }, memory_heap: { status: 'up' } },
          error: {},
          details: { database: { status: 'up' }, memory_heap: { status: 'up' } },
        },
      },
    }),
    ApiResponse({
      status: 503,
      description: 'Aplicação com algum indicador fora do ar',
      schema: {
        example: {
          status: 'error',
          info: { memory_heap: { status: 'up' } },
          error: { database: { status: 'down', message: 'Connection refused' } },
          details: {
            database: { status: 'down', message: 'Connection refused' },
            memory_heap: { status: 'up' },
          },
        },
      },
    }),
  );
}