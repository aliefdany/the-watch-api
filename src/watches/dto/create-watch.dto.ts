import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateWatchDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    description: 'Watch name to be created',
    example: 'Rolex Daytona',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    description: 'Reference number of the watch to be created',
    example: 'REF1001',
  })
  reference_number: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    required: true,
    description: 'Retail price (in number) of the watch to be created',
    example: 10000,
  })
  retail_price: number;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: "The watch's model release date in YYYY-MM-DD format",
    example: '2024-01-01',
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  release_date: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    description: 'Brand name of specific watch to be created',
    example: 'Rolex',
  })
  brand: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    description: 'Specific currency which the watch is sold for',
    example: 'USD',
  })
  currency: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    description: 'Origin country where the watch is come from',
    example: 'Switzerland',
  })
  origin_country: string;
}
