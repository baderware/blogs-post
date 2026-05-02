import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //this route might not be used
  //@Post()
  //create(@Body() createUserDto: CreateUserDto) {
    //return this.usersService.create(createUserDto);
  //}

  @Get()
  //this is only for admin!!!
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  //anyone 
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
 //a logged in for its own and admin for all 
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
 //only admin
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
