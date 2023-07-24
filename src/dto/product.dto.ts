import { IsString, IsInt, IsNumber, IsNotEmpty } from "class-validator";


export class addDto{

    @IsString({message:"name should be a string"})
    name:string;
    
    @IsString({message:"description should be a string"})
    description:string;
    
    @IsString({message:"status should be a string"})
    status:string;

    @IsNumber()
    price:number;

    @IsString()
    image:string;

    @IsInt()
    category_id:number;
    @IsInt()
    quantity:number;
    
    }


    export class EditDto{

        @IsInt()
        id:number
        @IsString({message:"name should be a string"})
        name:string;
        
        @IsString({message:"description should be a string"})
        description:string;
        
        @IsString({message:"status should be a string"})
        status:string;
    
        @IsNumber()
        price:number;
    
        @IsString()
        image:string;
    
        @IsInt()
        category_id:number;
        @IsString()
        quantity:string;
    }

    export class detailDto{
        @IsNotEmpty({message:"please provide the category Id"})
        @IsInt({message:"Id should be a number"})
        id:number;
    }