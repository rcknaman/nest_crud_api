
import { Request } from 'express';
import { productServices } from './product.services';
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { addDto, detailDto } from 'src/dto/product.dto';


@Controller('product')

export class productController {

    constructor(private productService:productServices){}


    @Post()
    async add(
        @Body() product:addDto,
       @Req() req:Request
    ){
        const cookie=req.cookies['jwt'];
        let user_id=await this.productService.authenticate(cookie);
        // let data={user_id,category_id,name,description,price,quantity,image,status};
        let data=Object.assign(product,user_id)
        let result=this.productService.addProduct(data);
        return result;
    }


    @Put()
    async edit(@Body() product,
   @Req() req:Request){

    const cookie=req.cookies['jwt'];
    let user_id=await this.productService.authenticate(cookie);
    let data=Object.assign(product,user_id);
    let result=this.productService.updateProduct(data,user_id);
    return result;
    }


    @Get()
    async detail(@Param('id') id:detailDto,
    @Req() req:Request){
        const cookie=req.cookies['jwt'];
        let user_id=await this.productService.authenticate(cookie);
        let result=await this.productService.productDetails(id,user_id);
        return result;
    }

    @Get()
    async list(@Req() req:Request){
        const cookie=req.cookies['jwt'];
        let user_id=await this.productService.authenticate(cookie);
        let result=await this.productService.allproducts();
        return result;
    }
    @Delete(':id')
    async delete(@Param('id') id:detailDto,
    @Req() req:Request){
        const cookie=req.cookies['jwt'];
        let user_id=await this.productService.authenticate(cookie);
        let result=await this.productService.deleteProduct(id,user_id);
        return result;
    }
}