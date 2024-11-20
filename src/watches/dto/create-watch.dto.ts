import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

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
  @ApiProperty({ required: true })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  release_date: Date;

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
