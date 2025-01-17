import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import session from 'express-session';
import formidableMiddleware from 'express-formidable';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Сессия для всех запросов
  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

  // Formidable только для админки
  app.use('/admin*', formidableMiddleware());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
