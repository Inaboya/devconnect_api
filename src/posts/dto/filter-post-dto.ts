import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FilterPostsParamsDTO {
  @IsOptional()
  @Type(() => String)
  @IsString()
  page: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  limit?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  searchTerm?: string;
}
