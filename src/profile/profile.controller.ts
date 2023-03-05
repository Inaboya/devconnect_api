import { Body, Controller, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreatePostDTO } from './dto/create-profile-dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  //   @ApiBearerAuth()
  //   @ApiOperation({ summary: 'Create a post' })
  //   @ApiCreatedResponse({
  //     status: 201,
  //     description: 'Post created',
  //   })
  //   @ApiUnauthorizedResponse({
  //     status: 401,
  //     description: 'Unauthorized.',
  //   })
  //   @ApiBadRequestResponse({
  //     status: 400,
  //     description: 'Bad request',
  //   })
  //   createProfile(@Body() payload: CreatePostDTO, @Req() req) {
  //     return this.profileService.createProfile(payload, req.user);
  //   }
}
