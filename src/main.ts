import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './infrastructure/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, // jika cors true maka semua origin bisa mengakses API
    logger: process.env.NODE_ENV === 'production' ? ['log'] : ['debug'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true, // menampilkan pesan pada console jika terjadi error,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Fisdas CMS OpenAPI')
    .setDescription('Dokumentasi API Fisdas CMS')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
