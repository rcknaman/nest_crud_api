import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  // await app.connectMicroservice<MicroserviceOptions>({

  //     transport: Transport.RMQ,
  //     options: {
  //     urls: ['amqp://guest:guest@127.0.0.1'],
  //     queue: 'test_queue',
  //     queueOptions: {
  //       durable: false
  //     } 
  //   }
  // })
  await app.startAllMicroservices();

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:'*',
    credentials:true
  })
  await app.listen(3003);
}
bootstrap();
