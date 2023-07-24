import { IsNotEmpty, IsString } from 'class-validator';


export class userDto{

    @IsNotEmpty({message:"please provide the category Id"})
    @IsString()
    name:string;
    @IsNotEmpty({message:"please provide the category Id"})
    @IsString()
    mobile:string;
    @IsNotEmpty({message:"please provide the category Id"})
    @IsString()
    email:string;
    @IsNotEmpty({message:"please provide the category Id"})
    @IsString()
    role:string;
    @IsNotEmpty({message:"please provide the category Id"})
    @IsString()
    password:string;

}
export class signinDto{
    @IsNotEmpty({message:"please provide the category Id"})
    @IsString()
    email:string;

    @IsNotEmpty({message:"please provide the category Id"})
    @IsString()
    password:string;
}