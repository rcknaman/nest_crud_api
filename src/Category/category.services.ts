import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Category } from "./category.entity";
import { User } from "src/User/user.entity";
import { JwtService } from "@nestjs/jwt";
import { error } from "console";
import { EditDto } from "src/dto/category.dto";
@Injectable()

export class categoryServices{

    constructor(@Inject('category_model') private categoryRepo: typeof Category,
    @Inject('user_model') private UserRepo: typeof User,private jwtService: JwtService){}


    async addCategory(category:any):Promise<Category>{
        return this.categoryRepo.create<Category>(category)
    }

    async authenticate(cookie:any){


        const data=await this.jwtService.verifyAsync(cookie);
        if(!data){
            throw new UnauthorizedException();
        }
        let user=await this.UserRepo.findOne({where:{id:data.id}});
        if(!user || user.role!='admin'){
            throw new UnauthorizedException();
        }
        return user.id;
    }

    async updateCategory(category:any, user_id){
        try {
            let data=await this.categoryRepo.findOne({where:{id:category.id}});
            console.log("data::",data);
            
            if(!data || Number(user_id)!=Number(data.user_id)){
                console.log("gdfhdfhfh");
                
                return {
                    message:"Access denied"
                }
                throw new Error('');
            }
            data=Object.assign(data,category);
            data.save();
            return {
                message:"category updated"
            }
        } catch(error){
            return {
                error: true,
                message: error.message
            }
        }
 
    }

    async categoryDetails(id:any,user_id):Promise<Category>{
        let data=await this.categoryRepo.findOne({where:{id:id}});
        
        if(!data || Number(user_id)!=Number(data.user_id)){
            throw new UnauthorizedException();
        }
        return data;
    }
    async allCategories():Promise<Category[]>{
        return this.categoryRepo.findAll({});
    }
    async deleteCategory(id:any,user_id:any){
        let data=await this.categoryRepo.findOne({where:{id:id}});
        
        if(!data || Number(user_id)!=Number(data.user_id)){
            throw new UnauthorizedException();
        }
        await this.categoryRepo.destroy({where:{id:id}});
        return {
            message:"category deleted"
        }
    }
}