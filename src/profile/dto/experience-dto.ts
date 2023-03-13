import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ExperienceDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  company: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  location: string;

  @ApiProperty()
  @IsDate()
  to: Date;

  @ApiProperty()
  @IsDate()
  from: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  current: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  description: string;
}
