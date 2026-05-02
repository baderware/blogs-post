import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Auth } from 'src/auth.decorators';
import { UserRole } from 'src/users/entities/user.entity';
import type { Request } from 'express';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

 //only logged-in can comment
  @Post()
  @Auth(UserRole.USER, UserRole.ADMIN, UserRole.MODERATOR)
  create(@Req() req:Request ,@Body() createCommentDto: CreateCommentDto, currentPostId: number) {
    const userId = req['user'].userID;
    //console.log(userId.userID);
    return this.commentsService.create(createCommentDto, currentPostId, userId);
  }
  //only admin
  @Get()
  @Auth(UserRole.ADMIN)
  findAll() {
    return this.commentsService.findAll();
  }
  //anyone
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }
  //only logged in
  @Patch(':id')
  @Auth(UserRole.USER, UserRole.ADMIN, UserRole.MODERATOR)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }
  //only admins
  @Delete(':id')
  @Auth(UserRole.ADMIN, UserRole.MODERATOR)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
