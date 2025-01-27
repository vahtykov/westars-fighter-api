import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Add middleware to handle OPTIONS requests before CORS
  // app.use((req, res, next) => {
  //   if (req.method === 'OPTIONS') {
  //     res.status(200).end();
  //     return;
  //   }
  //   next();
  // });

  app.use(json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: true, limit: '100mb' }));

  // Enable CORS with specific configuration
  app.enableCors({
    origin: true, // разрешает все origins для тестирования
    credentials: true,
    // preflightContinue: false,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
