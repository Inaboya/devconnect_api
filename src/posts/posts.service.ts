import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDTO } from './dto/create-post-dto';
import { PostsInterface } from './interface/posts.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Posts') private readonly postModel: Model<PostsInterface>,
  ) {}

  async createPost(payload: CreatePostDTO, user: string) {}
}
