import { Body, Controller, Post, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CustomRequest } from 'src/utils/customRequest';
import { CreatePostDTO } from './dto/create-post-dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a post' })
  @ApiCreatedResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDTO,
    @Req() req: CustomRequest,
  ) {
    return this.postService.createPost(createPostDto, req.user.id);
  }
}
