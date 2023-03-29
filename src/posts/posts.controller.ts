import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.service';
import { CustomRequest } from 'src/utils/customRequest';
import { CreatePostDTO } from './dto/create-post-dto';
import { FilterPostsParamsDTO } from './dto/filter-post-dto';
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
  @UseGuards(AuthGuard)
  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDTO,
    @Req() req: CustomRequest,
  ) {
    return await this.postService.createPost(createPostDto, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({
    status: 200,
    description: 'Get all posts',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(AuthGuard)
  @Get()
  async getAllPost(@Query() query: FilterPostsParamsDTO) {
    return await this.postService.getAllPosts(query);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get post by id' })
  @ApiParam({
    name: 'id',
    description: 'A valid mongodb id',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get post by id',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getPostById(@Param('id') id: string) {
    return await this.postService.getPostById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete post by id' })
  @ApiParam({
    name: 'id',
    description: 'A valid mongodb id',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Delete post by id',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deletePostById(@Param('id') id: string, @Req() req: CustomRequest) {
    return await this.postService.deletePostById(id, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Like a post' })
  @ApiParam({
    name: 'id',
    description: 'A valid mongodb id',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Like a post',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(AuthGuard)
  @Put('/like/:id')
  async likePost(@Param('id') id: string, @Req() req: CustomRequest) {
    return await this.postService.likePost(id, req.user.id);
  }
}
