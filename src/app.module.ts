import { Category } from './Category/category.entity';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModule } from './Product/product.module';

import { UserModule } from './User/user.module';
import { CategoryModule } from './Category/category.module';

@Module({
  imports: [UserModule, CategoryModule,ProductModule],
})
export class AppModule {}
