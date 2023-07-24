import { BelongsTo, Column, DataType, ForeignKey, Model,PrimaryKey,Table } from "sequelize-typescript";
import { Category } from "src/Category/category.entity";
import { User } from "src/User/user.entity";



@Table
export class Product extends Model{


  @PrimaryKey
  @Column({

    type:DataType.INTEGER,
    primaryKey:true,
    autoIncrement:true,
  })
  id:number;

  @Column({

    type:DataType.INTEGER
  })
  @ForeignKey(() => User)
  user_id:number;

  @BelongsTo(() => User)
  user: User;


  @Column({

    type:DataType.INTEGER
  })
  @ForeignKey(() => Category)
  category_id:number;

  @BelongsTo(() => Category)
  product:Product;

  @Column({

    type:DataType.STRING
  })
  name:string;

  @Column({

    type:DataType.STRING
  })
  description:string;

  @Column({

    type:DataType.INTEGER
  })
  quantity:number;

  @Column({

    type:DataType.STRING
  })
  image:string;

  @Column({

    type:DataType.STRING
  })
  status:String;

}