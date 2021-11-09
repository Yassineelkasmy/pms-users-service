import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { authMiddleware } from './middlewares/auth.middleware';
const cookieSession = require('cookie-session');  


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // var whitelist = ['example.com', 'api.example.com'];
  app.use(cookieSession({
    keys: ['ASDAS']
  }))
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser("secretkey"));
  app.use(authMiddleware);
  app.enableCors({credentials:true , origin:/https?:\/\/(([^/]+\.)?localhost\:8081)$/i});
  await app.listen(3000);
}
bootstrap();

