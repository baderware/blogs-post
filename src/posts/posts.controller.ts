import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Auth } from 'src/auth.decorators';
import { UserRole } from 'src/users/entities/user.entity';
import type { Request } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
//only logged in users should post
  @Post()
  @Auth(UserRole.ADMIN, UserRole.USER)
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const userId = req['user'].userID;
    //console.log(userId);
    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  //anyone can view the posts
  findAll() {
    return this.postsService.findAll();
  }

  //anyone can find specific post
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }
  //only logged in users can edit their respective posts 
  @Patch(':id')
  @Auth(UserRole.ADMIN, UserRole.USER)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }
 //admin can delete any post but user can only delete its own.
  @Delete(':id')
  @Auth(UserRole.USER, UserRole.MODERATOR, UserRole.USER)
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
