import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  avatar: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user: string;
}
