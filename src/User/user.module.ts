import { Module } from "@nestjs/common";
import { User } from "./user.entity";
import { SequelizeModule } from "@nestjs/sequelize";
import { userServices } from "./user.services";
import { userController } from "./user.controller";
import { DatabaseModule } from "src/config/database.module";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [DatabaseModule,JwtModule.register({
      secret:'secret',
      signOptions:{expiresIn:'1d'}
    })],
    providers:[userServices,  {
        provide: 'user_model',
        useValue: User,
      }],
    controllers:[userController]
})
export class UserModule{}