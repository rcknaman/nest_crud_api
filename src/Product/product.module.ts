import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./product.entity";
import { productController } from "./product.controller";
import { categoryServices } from "src/Category/category.services";
import { UserModule } from "src/User/user.module";
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "src/config/database.module";
import { productServices } from "./product.services";
import { User } from "src/User/user.entity";
import { Category } from "src/Category/category.entity";
import { CategoryModule } from "src/Category/category.module";


@Module({
    imports:[DatabaseModule,UserModule,JwtModule.register({
        secret:'secret',
        signOptions:{expiresIn:'1d'}
      })],
    controllers:[productController],
    providers:[productServices,{
        provide:'product_model',
        useValue:Product
    }, {
        provide: 'user_model',
        useValue: User,
      },{
        provide:'category_model',
        useValue:Category
    }]
})
export class ProductModule{}