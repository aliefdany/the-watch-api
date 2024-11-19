import { Watch } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

type CustomWatch = Omit<Watch, 'brandId' | 'countryId' | 'currencyId'>;

export class WatchEntity implements CustomWatch {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  reference_number: string;

  @ApiProperty()
  retail_price: number;

  @ApiProperty()
  release_date: Date;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  origin_country: string;

  @ApiProperty()
  currency: string;
}
