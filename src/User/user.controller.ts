import { BadRequestException, Body, Controller, Delete, Get, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { userServices } from "./user.services";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Request,Response } from "express";
import { signinDto, userDto } from "src/dto/user.dto";

@Controller('users')

export class userController {

    constructor(private readonly userService:userServices,private jwtService: JwtService){}


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
        @Res({passthrough:true}) response:Response
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
        return {
            message:"success"
        }
        
    }

    @Get('user')
    async getUser(@Req() req:Request){

        try {
            const cookie=req.cookies['jwt'];
            const data=await this.jwtService.verifyAsync(cookie);
            if(!data){
                throw new UnauthorizedException();
            }
            let user = await this.userService.findOne({ condition: { id: data['id'] }});
            const { password, ...result } = user['data'];
            console.log(result);
            
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
        return {
            message:'user deleted'
        }
    }
}
// Argument of type '{ id: number; name: string; mobile: string; email: string; role: string; password: string; }' is not assignable to parameter of type 'User'.
//   Type '{ id: number; name: string; mobile: string; email: string; role: string; password: string; }' is missing the following properties from type 'User': $add,