import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Swagger Documentation')
  .setDescription('Test of User Swagger API')
  .setVersion('1.0')
  .build();
