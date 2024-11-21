import { Prisma, Brand, Country, Currency } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';

type WatchWithRelations = Prisma.WatchGetPayload<{
  include: {
    brand: true;
    currency: true;
    origin_country: true;
  };
}>;

export class WatchEntity implements WatchWithRelations {
  @ApiProperty({ description: 'The id of the watch', example: 1 })
  id: number;

  @ApiProperty({
    description: 'The name of the watch',
    example: 'Rolex Daytona',
  })
  name: string;

  @ApiProperty({
    description: 'Reference number of the watch',
    example: 'REF2003',
  })
  reference_number: string;

  @ApiProperty({ description: 'Retail price of the watch', example: 1000 })
  retail_price: number;

  @ApiProperty({
    description: 'Release date of the watch',
    example: '2024-01-01',
  })
  release_date: Date;

  @ApiProperty({
    type: String,
    description: 'The brand of the watch',
    example: 'Rolex',
  })
  @Transform(({ value }) => value.name)
  brand: Brand;

  @ApiProperty({
    type: String,
    description: 'The origin country of the watch',
    example: 'France',
  })
  @Transform(({ value }) => value.name)
  origin_country: Country;

  @ApiProperty({
    type: String,
    description: 'Currency of the selled watch',
    example: 'EUR',
  })
  @Transform(({ value }) => value.name)
  currency: Currency;

  @Exclude()
  brandId: number;

  @Exclude()
  currencyId: number;

  @Exclude()
  countryId: number;

  constructor(partial: Partial<WatchEntity>) {
    Object.assign(this, partial);
  }
}
