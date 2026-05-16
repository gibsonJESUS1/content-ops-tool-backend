import 'reflect-metadata';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

import { HttpExceptionFilter } from './filters/http-exception.filter';

import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Security
  app.disable('x-powered-by');

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

  const port = Number(process.env.PORT) || 3000;

  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 Application running on port: ${port}`);

  logger.log(`📚 Swagger docs available at: /api/docs`);
}
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
bootstrap().catch((error) => {
  console.error('Application failed to start:', error);

  process.exit(1);
});
