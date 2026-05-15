import 'reflect-metadata';

import { Logger, ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { HttpExceptionFilter } from './filters/http-exception.filter';

import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Content Ops Tool API')
    .setDescription('Production grade content management backend API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      forbidNonWhitelisted: true,

      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformResponseInterceptor(),
  );

  const logger = new Logger('Bootstrap');

  const port = process.env.PORT || 3000;

  await app.listen(port);

  logger.log(`🚀 Application running on: http://localhost:${port}`);

  logger.log(`📚 Swagger docs available at: http://localhost:${port}/api/docs`);
}

void bootstrap();
