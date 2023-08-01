import { Module } from '@nestjs/common';
import { consumerMod } from './rabbit.consumer';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([

    {
      name: 'MATH_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@127.0.0.1'],
        queue: 'test_queue',
        queueOptions: {
          durable: false
        },
      },
    },


  ])],
  providers:[consumerMod],
  exports:[consumerMod]
})
export class RabbitModule {}