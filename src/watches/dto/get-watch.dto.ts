import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class GetWatchDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  search: string = '';

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  page?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  take?: number;
}
