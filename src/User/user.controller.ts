import { BadRequestException, Body, Controller, Delete, Get, OnModuleInit, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { userServices } from "./user.services";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Request,Response } from "express";
import { signinDto, userDto } from "src/dto/user.dto";
import { RedisCacheService } from "src/redis/redis.service";
import { Client, ClientGrpc, Ctx, MessagePattern, Payload, RmqContext, Transport } from '@nestjs/microservices';
import { join } from "path";
// import { IGrpcService } from "grpc.interface";

@Controller('users')

export class userController{

    constructor(private readonly userService:userServices,
        private jwtService: JwtService,private redisCacheService:RedisCacheService){}





    @Get('hello-grpc')
    async helloGrpc(@Body() body:any){
        return this.userService.helloGrpc(body);
    }

    // id: Unique identifier for the user (integer)
    // ● name: User's name (string)
    // ● mobile: User's mobile number (string)
    // ● email: User's email address (string)
    // ● role: User's role in the system (string: user, seller, admin)
    // ● password: User's password (string)
    @Post('register')
    async register(
        @Body() user:userDto
        
    ){
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
        const obj=Object.assign(user,{password:hashedPassword});
        let data=await this.userService.createUser(obj);
        return {
            message:'registered successfully',
            data
        }
    }
    @Post('signin')
    async login(
        @Body() user:signinDto,
        @Res({passthrough:true}) response:Response,
        @Req() req
    ){
        
        const data=await this.userService.findOne({condition:{email:user.email}});
        console.log(user);
        
        if(!data){
            throw new BadRequestException("invalid credentials");
        }
        
        if(!await bcrypt.compare(user.password,data.password)){
            throw new BadRequestException("invalid credentials");
        }

        const jwt= await this.jwtService.signAsync({id:data.id});
        
        response.cookie('jwt',jwt,{httpOnly:true});

        console.log(req.headers);
        
        return {
            message:"success"
        }
        
    }
    // @Get()
    // async consume(){
    //     let x= await this.consMod.subscribeToMessages();
    //     return {
    //         message:"message stored",
    //         x
    //     }
    // }
    @Get('user')
    async getUser(@Req() req:Request){

        try {
            const cookie=req.cookies['jwt'];
            const data=await this.jwtService.verifyAsync(cookie);
            if(!data){
                throw new UnauthorizedException();
            }
            let hit=await this.redisCacheService.get(data['id']);
            if(hit){
                console.log('hit');
                
                return hit;
            }
            console.log('miss');
            
            let user = await this.userService.findOne({ condition: { id: data['id'] }});

            let { password, ...result } = user;
            // console.log(req.headers);
            
            await this.redisCacheService.set(data['id'],result);
            return result;
            
        } catch (error) {
            
            throw new UnauthorizedException();
        }
    }
    @Delete()
    async delete(@Req() req:Request){
        const cookie=req.cookies['jwt'];
        const data=await this.jwtService.verifyAsync(cookie);
        await this.userService.deleteUser({ condition: { id: data['id'] }});
        await this.redisCacheService.del(data['id']);
        return {
            message:'user deleted'
        }
    }

    @MessagePattern('replace-emoji')
    replaceEmoji(@Payload() data: string, @Ctx() context: RmqContext): string {
      const { properties: { headers } } = context.getMessage();
      console.log("data:::",data);
      console.log(`Pattern: ${context.getPattern()}`);
      
      return headers['x-version'] === '1.0.0' ? '🐱' : '🐈';
    }


}
// Argument of type '{ id: number; name: string; mobile: string; email: string; role: string; password: string; }' is not assignable to parameter of type 'User'.
//   Type '{ id: number; name: string; mobile: string; email: string; role: string; password: string; }' is missing the following properties from type 'User': $add,