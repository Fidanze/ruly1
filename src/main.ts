import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptor';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
    }
  ));
  app.connectMicroservice({
    transport: Transport.TCP,
  });
  
  await app.startAllMicroservices();
  await app.listen(3001)
}
bootstrap();
