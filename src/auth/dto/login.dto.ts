import { isEmail, isString } from "class-validator";

export class LogInDto {
    @isEmail({},{message:'please use a valid email'})
    email:string;
    @isString()
    password:string;
}
