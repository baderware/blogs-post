import { IsEmail, IsString } from "class-validator";

export class LogInDto {
    @IsEmail({},{message:'please use a valid email'})
    email:string;
    @IsString()
    password:string;
}
