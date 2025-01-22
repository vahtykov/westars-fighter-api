import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import session from 'express-session';
import formidableMiddleware from 'express-formidable';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Сессия для всех запросов с улучшенной конфигурацией
  app.use(session({
    secret: process.env.SESSION_SECRET || 'your-strong-secret-key',
    resave: false,
    saveUninitialized: false,
    name: 'fighter.sid', // кастомное имя для cookie
    cookie: {
      httpOnly: true, // защита от XSS
      secure: process.env.NODE_ENV === 'production', // HTTPS только в production
      maxAge: 160 * 60 * 60 * 1000, // 24 часа
      sameSite: 'lax' // защита от CSRF
    }
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
