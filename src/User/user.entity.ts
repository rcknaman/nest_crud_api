import { ForeignKey, PrimaryKey } from 'sequelize-typescript';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Category } from 'src/Category/category.entity';
import { Product } from 'src/Product/product.entity';

@Table
export class User extends Model{
@PrimaryKey
@Column({
  type:DataType.INTEGER,
  primaryKey:true,
  autoIncrement:true,
})
id:number;
@Column({
  type:DataType.STRING,
})
name:string;

@Column({
  type:DataType.STRING
})
mobile:string;
@Column({
  type:DataType.STRING
})
email:string;

@Column({
  type:DataType.STRING
})
role:string;

@Column({
  type:DataType.STRING
})
password:string;

@HasMany(() => Product, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', // Set onDelete option to 'CASCADE'
})
products: Product[];


@HasMany(() => Category, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', // Set onDelete option to 'CASCADE'
})
categories: Category[];
}