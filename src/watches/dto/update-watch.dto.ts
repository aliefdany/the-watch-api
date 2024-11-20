import { PartialType } from '@nestjs/mapped-types';
import { CreateWatchDto } from './create-watch.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWatchDto extends PartialType(CreateWatchDto) {
  @ApiProperty({ required: true })
  reference_number: string;

  @ApiProperty({ required: true })
  retail_price: number;

  @ApiProperty({ required: true })
  release_date: Date;

  @ApiProperty({ required: true })
  brand: string;

  @ApiProperty({ required: true })
  currency: string;

  @ApiProperty({ required: true })
  origin_country: string;
}
