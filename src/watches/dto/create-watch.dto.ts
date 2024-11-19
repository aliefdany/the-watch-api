import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateWatchDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  reference_number: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  retail_price: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ required: true })
  release_date: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  brand: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  currency: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  origin_country: string;
}
