import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => {
      const cleanErrors = errors.map(error => {
        return {
          property: error.property,
          constraints: error.constraints
        }
      })
      return new BadRequestException({
        alert: "se han detectado los siguientes errores:",
        errors: cleanErrors
      });}}))

  await app.listen(3000);
}
bootstrap();
