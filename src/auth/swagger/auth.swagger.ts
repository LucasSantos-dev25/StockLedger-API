import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export function ApiRegister() {
  return applyDecorators(
    ApiTags('auth'),
    ApiOperation({ summary: 'Cadastra um novo usuário' }),
    ApiResponse({ status: 201, description: 'Usuário criado com sucesso' }),
    ApiResponse({ status: 409, description: 'E-mail já cadastrado' }),
  );
}

export function ApiLogin() {
  return applyDecorators(
    ApiTags('auth'),
    ApiOperation({ summary: 'Autentica um usuário e retorna um token JWT' }),
    ApiResponse({
      status: 200,
      description: 'Login efetuado com sucesso',
      schema: { example: { access_token: 'eyJhbGciOi...' } },
    }),
    ApiResponse({ status: 401, description: 'Credenciais inválidas' }),
  );
}