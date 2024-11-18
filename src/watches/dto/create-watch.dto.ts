import { ApiProperty } from '@nestjs/swagger';

export class CreateWatchDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  reference_number: string;

  @ApiProperty({ required: true })
  retail_price: number;

  @ApiProperty({ required: true })
  release_date: string;

  @ApiProperty({ required: true })
  brand: string;

  @ApiProperty({ required: true })
  currency: string;

  @ApiProperty({ required: true })
  origin_country: string;
}
