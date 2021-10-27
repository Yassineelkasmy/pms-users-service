import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { authMiddleware } from './middlewares/auth.middleware';
const cookieSession = require('cookie-session');  


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['ASDAS']
  }))
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser("secretkey"));
  app.use(authMiddleware);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
