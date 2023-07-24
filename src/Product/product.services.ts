import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Product } from "./product.entity";
import { User } from "src/User/user.entity";
import { JwtService } from "@nestjs/jwt";
import { Category } from "src/Category/category.entity";


@Injectable()

export class productServices{

    constructor(@Inject('product_model') private productRepo: typeof Product,
    @Inject('user_model') private UserRepo: typeof User,private jwtService: JwtService,
    @Inject('category_model') private CategoryRepo: typeof Category
    ){}


    async addProduct(product:any){

        let category=await this.CategoryRepo.findOne({where:{id:product.category_id}});
        if(!category){
            return {
                message:"category does'nt exist"
            }
        }
        return this.productRepo.create(product);
    }

    async authenticate(cookie:any){


        const data=await this.jwtService.verifyAsync(cookie);
        console.log("data:::",data);
        
        if(!data){
            throw new UnauthorizedException();
        }
        let user=await this.UserRepo.findOne({where:{id:data.id}});
        if(!user || user.role!='seller'){
            throw new UnauthorizedException();
        }
        return user.id;
    }
    async updateProduct(product:any,user_id:any){

        let data=await this.productRepo.findOne({where:{id:product.id}});

        if(!data || Number(user_id)!=Number(data.user_id)){
            throw new UnauthorizedException();
        }
        data=Object.assign(data,product);
        data.save();
        
        return {
            message:"product updated"
        }
    }

    async productDetails(id:any,user_id):Promise<Product>{
        let data=await this.productRepo.findOne({where:{id:id}});
        
        if(!data || Number(user_id)!=Number(data.user_id)){
            throw new UnauthorizedException();
        }
        return data;
    }
    async allproducts():Promise<Product[]>{
        return this.productRepo.findAll({});
    }

    async deleteProduct(id:any,user_id:any){
        let data=await this.productRepo.findOne({where:{id:id}});
        
        if(!data || Number(user_id)!=Number(data.user_id)){
            throw new UnauthorizedException();
        }
        return this.productRepo.destroy({where:{id:id}});
    }
}