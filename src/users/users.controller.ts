import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDTO, CreateUserDTO } from './dto/create-users-dto';
import { LoginUserDTO } from './dto/login-users-dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDTO,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
  })
  @Post()
  async registerUser(@Body() payload: CreateUserDTO) {
    // console.log(payload, 'payload');
    return await this.userService.registerUser(payload);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
    type: UserDTO,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
  })
  @Post('login')
  async loginUser(@Body() payload: LoginUserDTO) {
    return await this.userService.loginUser(payload);
  }
}
