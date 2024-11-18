import { ApiProperty } from '@nestjs/swagger';

export class SearchWatchDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  reference_number: string;

  @ApiProperty({ required: true })
  brand: string;

  @ApiProperty({ required: true })
  total_items: number;

  @ApiProperty({ required: true })
  page: number;

  @ApiProperty({ required: true })
  take: number;
}
