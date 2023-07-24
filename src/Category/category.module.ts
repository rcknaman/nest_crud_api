import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "./category.entity";
import { categoryServices } from "./category.services";
import { categoryController } from "./category.controller";
import { DatabaseModule } from "src/config/database.module";
import { UserModule } from "src/User/user.module";
import { User } from "src/User/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { Product } from "src/Product/product.entity";
import { ProductModule } from "src/Product/product.module";

@Module({
    imports:[DatabaseModule,ProductModule,UserModule,JwtModule.register({
        secret:'secret',
        signOptions:{expiresIn:'1d'}
      })],
    providers:[categoryServices,{
        provide:'category_model',
        useValue:Category
    }, {
        provide: 'user_model',
        useValue: User,
      },{
        provide:'product_model',
        useValue:Product
    }],
    controllers:[categoryController]
})

export class CategoryModule {}

