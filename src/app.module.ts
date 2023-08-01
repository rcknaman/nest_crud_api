import { Category } from './Category/category.entity';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModule } from './Product/product.module';

import { UserModule } from './User/user.module';
import { CategoryModule } from './Category/category.module';
import { RabbitModule } from './rabbitMq/rabbit.module';

@Module({
  imports: [UserModule, CategoryModule,ProductModule,RabbitModule],
})
export class AppModule {}
