import { IsInt, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class addDto{


@IsString({message:"name should be a string"})
name:string;

@IsString({message:"description should be a string"})
description:string;

@IsString({message:"status should be a string"})
status:string


}
export class EditDto{

    @IsNotEmpty({message:"please provide the category Id"})
    @IsInt()
    id:number;

    @IsString({message:"name should be a string"})
    name:string;

    @IsString({message:"description should be a string"})
    description:string;

    @IsString({message:"status should be a string"})
    status:string
}
export class detailDto{
    @IsNotEmpty({message:"please provide the category Id"})
    @IsInt({message:"Id should be a number"})
    id:number;
}