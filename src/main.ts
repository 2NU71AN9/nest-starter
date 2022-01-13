import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置swagger文档
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest-starter api document')
    .setDescription('nest-starter api document description')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  app.use(logger);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
