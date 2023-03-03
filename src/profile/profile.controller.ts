import { Body, Controller, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreatePostDTO } from './dto/create-post-dto';

@Controller('profile')
export class ProfileController {
    constructor(private readonly postService: PostService) {}
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a post' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Post created',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
  })
  createPost(@Body() payload: CreatePostDTO, @Req() req) {
    return this.postService.createPost(payload, req.user);
  }
}
