import { Inject, Injectable, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { where } from "sequelize";


@Injectable()

export class userServices{

    constructor(@Inject('user_model') private UserRepo: typeof User) {}
    
    async createUser(user: any):Promise<User>{
        return this.UserRepo.create<User>(user);
    }
    async findOne({condition}:any):Promise<User>{
        console.log(condition);
        
         return await this.UserRepo.findOne({where:condition});
        //  console.log(x);
        //  return x;
    }
    async deleteUser({condition}:any){
        return await this.UserRepo.destroy({where:condition})
    }
}