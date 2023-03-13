import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.service';
import { CustomRequest } from 'src/utils/customRequest';
import { CreateProfileDTO } from './dto/create-profile-dto';
import { EducationDTO } from './dto/education-dto';
import { ExperienceDTO } from './dto/experience-dto';
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
    console.log({ payload });
    console.log(req.user.id, 'req.user.id');
    // console.log(req, 'req.user.id');
    return this.profileService.createProfile(payload, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all profiles' })
  @ApiOkResponse({
    status: 200,
    description: 'fetch all profiles',
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
  @Get()
  getAllProfiles() {
    return this.profileService.getAllProfiles();
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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'get user profile by id' })
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
  @ApiParam({
    name: 'id',
    required: true,
    description: 'must be a valid mongodb id',
  })
  @UseGuards(AuthGuard)
  @Get(':user_id')
  getProfileById(@Param('user_id') user_id: string) {
    return this.profileService.getProfile(user_id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add experience to profile' })
  @ApiOkResponse({
    status: 200,
    description: 'add experience to user profile',
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
  @Post('experience')
  addExperience(@Body() payload: ExperienceDTO, @Req() req: CustomRequest) {
    return this.profileService.addExperience(payload, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete one experience from profile' })
  @ApiOkResponse({
    status: 200,
    description: 'delete one experience from user profile',
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
  @Delete('experience/:exp_id')
  deleteExperience(@Param('exp_id') exp_id: string, @Req() req: CustomRequest) {
    return this.profileService.deleteExperience(exp_id, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add education to profile' })
  @ApiOkResponse({
    status: 200,
    description: 'add education to user profile',
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
  @Post('education')
  addEducation(@Body() payload: EducationDTO, @Req() req: CustomRequest) {
    return this.profileService.addEducation(payload, req.user.id);
  }
}
