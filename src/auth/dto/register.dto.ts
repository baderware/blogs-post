import { IsEmail ,IsString,MaxLength,MinLength,IsOptional, IsNotEmpty } from 'class-validator';
export class RegisterDto {
    @IsNotEmpty()
    @IsEmail({},{message: 'please enter a valid email! '})
    email:string;

    @IsString()
    @IsNotEmpty()
    firstName:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(32,{message: 'password cant be greater than 32 characters'})
    @MinLength(8,{message:'password cant less than 8 charachter'})
    password: string;

    @IsString()
    @IsOptional()
    lastName:string;
}
