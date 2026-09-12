import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const env = configService.get<string>('NODE_ENV');
  const port = configService.get<number>('PORT') ?? 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (env !== 'production') {
    const config = new DocumentBuilder()
      .setTitle("Fundamentals Study")
      .setDescription("Fundamentos de Boas práticas de Back-end")
      .setVersion("1.0")
      .addTag("Boas Práticas com Regras de Negócio")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(port);
  
  if (env !== 'production') {
    console.log(`🚀 Aplicação rodando em: http://localhost:${port}`);
    console.log(`📄 Swagger ativo em: http://localhost:${port}/api/docs`);
  }
}
bootstrap();