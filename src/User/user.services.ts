    import { Inject, Injectable, OnModuleInit, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { where } from "sequelize";
import { Client, ClientGrpc, Transport } from "@nestjs/microservices";
import { join } from "path";
import { IGrpcService } from "./grpc.interface";


@Injectable()

export class userServices implements OnModuleInit{

    constructor(@Inject('user_model') private UserRepo: typeof User,@Inject('grpc_token') private client:ClientGrpc) {}

    private grpcservice:IGrpcService;


    onModuleInit() {
        this.grpcservice=this.client.getService<IGrpcService>('grpcService');
    }

    async helloGrpc(data:any){
        console.log(this.grpcservice);
        
        return this.grpcservice.helloGrpc({ name:"sandeep.sori"});
    }
    
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