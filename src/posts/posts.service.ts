import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {

    constructor(
      @InjectRepository(Post)
      private repo: Repository<Post>,
    ) {}

  async create(postData: CreatePostDto, userId: any) {
    const post = this.repo.create({
      ...postData,
      user:{id:userId}
    });
    return await this.repo.save(post);
  }

  async findAll() {
    return await this.repo.find({select : ['content']});
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({id : id});
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const toEditPost = await this.repo.findOneBy({id : id});
    if(!toEditPost){
      throw new NotFoundException(`Post #${id} not found`);
    }
    return ;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
