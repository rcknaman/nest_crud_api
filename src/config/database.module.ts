import { Module } from '@nestjs/common';
import { sequelizeConfig } from './sequelize.config';

@Module({
  providers: [...sequelizeConfig],
  exports: [...sequelizeConfig],
})
export class DatabaseModule {}