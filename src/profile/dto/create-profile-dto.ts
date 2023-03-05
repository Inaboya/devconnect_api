import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfileDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly company: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  website: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  location: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  skills: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  githubusername: string;
}
