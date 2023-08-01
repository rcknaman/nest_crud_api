import { Sequelize } from 'sequelize-typescript';
import { Category } from 'src/Category/category.entity';
import { Product } from 'src/Product/product.entity';
import { User } from 'src/User/user.entity';

export const sequelizeConfig = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'naman',
        password: 'admin@123',
        database: 'antech',
      });
      sequelize.addModels([User,Category,Product]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
