import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class EducationDTO {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  school: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  degree: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  fieldofstudy: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  from: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  to: string;

  @ApiProperty()
  @IsBoolean()
  @Type(() => Boolean)
  current: boolean;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  description: string;
}
