import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { sendPaginatedResponse } from 'src/utils/paginate';
import { validatePost } from 'src/utils/validatePost';
import { CreatePostDTO } from './dto/create-post-dto';
import { FilterPostsParamsDTO } from './dto/filter-post-dto';
import { PostsInterface } from './interface/posts.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Posts') private readonly postModel: Model<PostsInterface>,
    private readonly userService: UsersService,
  ) {}

  async createPost(payload: CreatePostDTO, user: string) {
    const { text } = payload;

    try {
      const { errors, isValid } = validatePost(payload);

      if (isValid === false) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: errors,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const foundUser = await this.userService.findUserById(user);

        const newPost = new this.postModel({
          text,
          name: foundUser.name,
          avatar: foundUser.avatar,
          user,
        });

        await newPost.save();

        return newPost;
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllPosts(query: FilterPostsParamsDTO) {
    let filteredPost;

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 100;
    const skip = (page - 1) * limit;

    try {
      filteredPost = await this.postModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const totalPosts = await this.postModel.countDocuments();

      const metaData = {
        data: filteredPost,
        count: totalPosts,
        skip,
        limit,
        page,
      };

      return sendPaginatedResponse(metaData);
    } catch (error) {
      throw error;
    }
  }

  async getPostById(id: string) {
    try {
      const post = await this.postModel.findById({ _id: id });

      if (!post) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Post not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return post;
    } catch (error) {
      throw error;
    }
  }

  async deletePostById(id: string, user: string) {
    try {
      const post = await this.postModel.findById({ _id: id });

      if (!post) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Post not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (post.user.toString() !== user) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'User not authorized',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      await post.remove();

      return post;
    } catch (error) {
      throw error;
    }
  }

  async likePost(id: string, user: string) {
    try {
      const post = await this.postModel.findById({ _id: id });

      if (!post) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Post not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (post.likes.some((like) => like.user.toString() === user)) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Post already liked',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      post.likes.unshift({ user });

      await post.save();

      return post;
    } catch (error) {
      throw error;
    }
  }

  async unlikePost(id: string, user: string) {
    try {
      const post = await this.postModel.findById({ _id: id });

      if (!post) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Post not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (!post.likes.some((like) => like.user.toString() === user)) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Post has not yet been liked',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      post.likes = post.likes.filter((post) => post.user.toString() !== user);

      await post.save();

      return post;
    } catch (error) {
      throw error;
    }
  }
}
