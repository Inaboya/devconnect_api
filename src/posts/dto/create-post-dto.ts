import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;
}
