import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SearchWatchDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  reference_number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  brand: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  total_items: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  take: number;
}
