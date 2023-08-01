import { Module } from "@nestjs/common";
import { User } from "./user.entity";
import { SequelizeModule } from "@nestjs/sequelize";
import { userServices } from "./user.services";
import { userController } from "./user.controller";
import { DatabaseModule } from "src/config/database.module";
import { JwtModule } from "@nestjs/jwt";
import { RedisCacheModule } from "src/redis/redis.module";
import { consumerMod } from "src/rabbitMq/rabbit.consumer";
import { RabbitModule } from "src/rabbitMq/rabbit.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";


@Module({
    imports: [DatabaseModule,JwtModule.register({
      secret:'secret',
      signOptions:{expiresIn:'1d'}
    }),RedisCacheModule,RabbitModule,ClientsModule.register([{
      name:'grpc_token',
      transport:Transport.GRPC,
      options:{
        url:'localhost:50051',
        package: 'app',
        protoPath: join(__dirname, '../../app.proto'),
      }
    }])],
    providers:[userServices,  {
        provide: 'user_model',
        useValue: User,
      }],
    controllers:[userController]
})
export class UserModule{}

