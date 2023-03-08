import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.service';
import { CustomRequest } from 'src/utils/customRequest';
import { CreateProfileDTO } from './dto/create-profile-dto';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
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
  @UseGuards(AuthGuard)
  @Post()
  createProfile(@Body() payload: CreateProfileDTO, @Req() req: CustomRequest) {
    // console.log(req, 'req.user.id');
    return this.profileService.createProfile(payload, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({
    status: 200,
    description: 'fetch user profile',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
  })
  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Req() req: CustomRequest) {
    return this.profileService.getProfile(req.user.id);
  }
}
