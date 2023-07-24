import { Column, DataType,ForeignKey,HasMany,Model, PrimaryKey, Table } from "sequelize-typescript";
import { Product } from "src/Product/product.entity";
import { User } from "src/User/user.entity";


@Table
export class Category extends Model{

    @PrimaryKey
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
  })
    id: number;

    @ForeignKey(()=>User)
    @Column({
        type:DataType.INTEGER,
    })
    user_id: number;

    @Column({
        type:DataType.STRING,
    })
    name:string;

    @Column({
        type:DataType.STRING,
    })
    description:string
    @Column({
        type:DataType.STRING,
    })
    status:string
    @HasMany(() => Product, {
        foreignKey: 'category_id',
        onDelete: 'CASCADE', // Set onDelete option to 'CASCADE'
      })
      products: Product[];
}