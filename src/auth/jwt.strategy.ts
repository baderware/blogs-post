import { Injectable, PayloadTooLargeException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";
import { validate } from "class-validator";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService){
        //EXTRACTING THE BEARER TOEKN FROM THE HEADRS GO THE REQUEST
        super({
                jwtFromeRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretKey: configService.get<string>('SECRET_KEY'),

        });
        //It is internally called by Passport
        //this will create the "req.user" object after decoding the payLoad of jwt
        validate(payload:any){
            
            return  {
                userID:payload.sub,
                email:payload.email,
                role:payload.role
            }
        }
    }
}