import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;
}
