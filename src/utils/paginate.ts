import { ApiProperty } from '@nestjs/swagger';

export interface paginationData {
  data: any[];
  skip: number;
  limit: number;
  count: number;
  page: number;
}

export class PaginatedResponseDto {
  @ApiProperty()
  data?: any[];

  @ApiProperty()
  count?: number;

  @ApiProperty()
  totalPages?: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  previousPage: boolean;

  @ApiProperty()
  nextPage: boolean;
}

export const sendPaginatedResponse = (
  metaData: paginationData,
): PaginatedResponseDto => {
  const { skip, count, data, page, limit } = metaData;

  let previousPage = false;
  let nextPage = true;
  const response = {} as PaginatedResponseDto;

  if (skip === 0) {
    if (page >= Math.ceil(count / limit)) {
      previousPage = false;
      nextPage = false;
    } else {
      previousPage = false;
      nextPage = true;
    }
  } else if (page >= Math.ceil(count / limit)) {
    previousPage = true;
    nextPage = false;
  } else if (page < Math.ceil(count / limit)) {
    previousPage = true;
    nextPage = true;
  }

  if (data.length > 0) {
    response.data = data;
    response.count = count;
    response.previousPage = previousPage;
    response.nextPage = nextPage;
    response.totalPages = Math.ceil(count / limit);
    response.currentPage = page;
  }

  return response;
};
