import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';

const SWAGGER_ENVS = ['local', 'dev', 'staging'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (SWAGGER_ENVS.includes(configService.get<string>('NODE_ENV'))) {
    app.use(
      ['/api/swagger', '/docs-json'],
      basicAuth({
        challenge: true,
        users: {
          [configService.get<string>('SWAGGER_USER')]:
            configService.get<string>('SWAGGER_PASSWORD'),
        },
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription('The Posts API')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('auth')
      .addTag('users')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/swagger', app, document);
  }

  app.enableCors();
  const port = configService.get<number>('NODE_API_PORT') || 3000;
  await app.listen(port);
  // Logger.log(`Url for OpenApi: ${await app.getUrl()}/api/swagger`, 'Swagger');
  Logger.log(`Url for OpenApi: http://localhost:3000/api/swagger`, 'Swagger');
}
bootstrap();
