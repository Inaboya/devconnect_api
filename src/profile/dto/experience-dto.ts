import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
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
  @Type(() => String)
  @IsString()
  readonly from: string;

  @ApiProperty()
  @Type(() => String)
  @IsString()
  readonly to: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  current: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  description: string;
}
