import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
//import { UpdateAuthDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { LogInDto } from './dto/login.dto';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.userService.create(dto);
  }

  @Post('login')
  login(@Body() dto: LogInDto){
    return this.authService.login(dto);
  }

}
