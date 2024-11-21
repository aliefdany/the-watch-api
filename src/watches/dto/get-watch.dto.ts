import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class GetWatchDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'The brand name to be filtered',
    example: 'Audemars Piguet',
  })
  brand: string = '';

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Watch name or reference number to be searched',
    example: 'rolex',
  })
  search: string = '';

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    required: false,
    description: 'Page number to be fetched',
    example: 2,
  })
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    required: false,
    description: 'How many items fetched in a single request',
    example: 10,
  })
  take?: number;
}
