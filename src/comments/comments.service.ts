import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
//import type { Request } from 'express';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private repo: Repository<Comment>,
  ) {}
  create(data: CreateCommentDto, currentPostId: number, userId: any) {
    //console.log(userId);
    const comment = this.repo.create({
      ...data,
      author:{id:userId},
    });
    console.log(comment);
    return this.repo.save(comment);
  }

  async findAll() {
    return await this.repo.find({
  select: ['content'],
});
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
