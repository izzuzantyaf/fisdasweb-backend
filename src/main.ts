import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // TODO: don't allow cors in production, only allow the fisdasweb and fisdascms
    cors: true, // jika cors true maka semua origin bisa mengakses API
    logger: process.env.NODE_ENV === 'production' ? ['log'] : ['verbose'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api');

  const logger = new Logger('NestApplication');
  await app
    .listen(process.env.PORT)
    .then(() => {
      logger.log(`Application started in http://localhost:${process.env.PORT}`);
    })
    .catch((error) => {
      logger.error(`Application failed to start: `, error);
    });
}
bootstrap();
