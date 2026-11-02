// import { NestFactory } from '@nestjs/core';
// import {
//   DocumentBuilder,
//   SwaggerModule,
// } from '@nestjs/swagger';
// import { AppModule } from './app.module.js';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Swagger API configuration
//   const swaggerConfig = new DocumentBuilder()
//     .setTitle('Dispensary Management API')
//     .setDescription(
//       'API documentation for the Dispensary Management System. ' +
//         'Register or login to obtain a JWT token. ' +
//         'Protected endpoints require Bearer token authentication.',
//     )
//     .setVersion('1.0.0')
//     .addBearerAuth(
//       {
//         type: 'http',
//         scheme: 'bearer',
//         bearerFormat: 'JWT',
//         in: 'header',
//         name: 'Authorization',
//         description: 'Enter your JWT access token.',
//       },
//       'JWT-auth',
//     )
//     .build();

//   // Generate Swagger documentation
//   const swaggerDocument = SwaggerModule.createDocument(
//     app,
//     swaggerConfig,
//   );

//   // Setup Swagger UI
//   SwaggerModule.setup(
//     'api-docs',
//     app,
//     swaggerDocument,
//     {
//       customSiteTitle: 'Dispensary Management API',
//       jsonDocumentUrl: 'api-docs-json',
//       swaggerOptions: {
//         persistAuthorization: true,
//       },
//     },
//   );

//   await app.listen(3000);
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger API configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Dispensary Management API')
    .setDescription(
      'API documentation for the Dispensary Management System. ' +
        'Register or login to obtain a JWT token. ' +
        'Protected endpoints require Bearer token authentication.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
        description: 'Enter your JWT access token.',
      },
      'JWT-auth',
    )
    .build();

  // Generate Swagger documentation
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  // Setup Swagger UI
  SwaggerModule.setup('api-docs', app, swaggerDocument, {
    customSiteTitle: 'Dispensary Management API',
    jsonDocumentUrl: 'api-docs-json',
    swaggerOptions: {
      persistAuthorization: true,
      deepLinking: false,
    },
  });

  await app.listen(3000);
}

bootstrap();
