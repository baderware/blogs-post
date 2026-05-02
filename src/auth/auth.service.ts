import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
//import { UpdateAuthDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
      const user=await this.userService.findOneByEmail(email);
      if (!user) throw new UnauthorizedException('User not found');

      const isMatch = await bcrypt.compare(pass,user.password);
      if (!isMatch) throw new UnauthorizedException('invalid credentials! ');

      //this will strip the password property from the user and save it the rest as result. 
      const {password,...result}=user;
      return result
  }
  async login(user:any) {
    const userInfo=await this.validateUser(user.email,user.password)
    const payload={
      sub:userInfo.id,
      email:userInfo.email,
      role:userInfo.role
    }

    return {
        accessToken: this.jwtService.sign(payload),
    }
  }
}
