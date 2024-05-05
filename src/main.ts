import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { rateLimit } from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests, please try again later.',
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      forbidUnknownValues: false,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // Apply CSRF protection middleware

  const config = new DocumentBuilder()
    .setTitle('We hosst')
    .setDescription('Jobs portal We hosst')
    .setVersion('1.0')
    .addTag('jobs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}

bootstrap();
