import { isEmail ,isString,maxLength,minLength,IsOptional, IsNotEmpty, isNotEmpty } from 'class-validator';
export class RegisterDto {
    @isNotEmpty()
    @isEmail({},{message: 'please enter a valid email! '})
    email:string;

    @isString()
    @IsNotEmpty()
    firstName:string;

    @isString()
    @isNotEmpty()
    @maxLength(32,{message: 'password cant be greater than 32 characters'})
    @minLength(8,{message:'password cant less than 8 charachter'})
    password: string;

    @isString()
    @IsOptional()
    lastName:string;
}
