import { error } from 'console';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UnauthorizedException,Request, Response } from "@nestjs/common";
import { addDto, detailDto, EditDto } from "../dto/category.dto";
//import { Request } from "express";
import { categoryServices } from "./category.services";

@Controller('category')
export class categoryController {


    constructor(private categoryService:categoryServices){}

    @Post()
    async add(
        @Body() category:addDto,
        @Request() req:any
    ){
        let name=category.name;
        let description=category.description;
        let status=category.status;

        const cookie=req.cookies['jwt'];
        let user_id=await this.categoryService.authenticate(cookie);
        let data={name,description,status,user_id};
        
        let result=await this.categoryService.addCategory(data);
        return result;
    }
    
    @Put()
    async edit(@Request() req:any, @Body() category:EditDto,
     @Response() response:any){
        try {
            const cookie=req.cookies['jwt'];
            const user_id=await this.categoryService.authenticate(cookie);
            console.log("category:::",category);
            
            const result= await this.categoryService.updateCategory(category,user_id);
            console.log("result:::",result);
            
            return response.status(200).send(result);;
        } catch (error){
            return response.status(400).send({
                error: true,
                message: error.message,
            });
        }
        
    }

    @Get(':id')
    async detail(@Param('id') id:detailDto,
    @Request() req:any){
     
        const cookie=req.cookies['jwt'];
        let user_id=await this.categoryService.authenticate(cookie);
        let result=await this.categoryService.categoryDetails(id,user_id);
        return result;
    }
    @Get()
    async list(@Req() @Request() req:any){
        const cookie=req.cookies['jwt'];
        let user_id=await this.categoryService.authenticate(cookie);
        let result=await this.categoryService.allCategories();
        return result;
    }
    @Delete(':id')
    async delete(@Param('id') id:detailDto,
    @Request() req:any){
        const cookie=req.cookies['jwt'];
        let user_id=await this.categoryService.authenticate(cookie);
        let result=await this.categoryService.deleteCategory(id,user_id);
        return result;
    }

}
