import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { AppModule } from './app.module';

async function bootstrap() {
  const globalPrefix = process.env.GLOBAL_PREFIX || 'api';
  const swaggerPrefix = process.env.SWAGGER_PREFIX || 'documentation';
  const port = process.env.PORT || 3333;

  patchNestJsSwagger();

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('District V')
    .setDescription('District V Roleplay Backend API')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPrefix, app, document);

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
    Logger.log(
      `Swagger Documentation at http://localhost:${port}/${swaggerPrefix}`,
    );
  });
}
bootstrap();
