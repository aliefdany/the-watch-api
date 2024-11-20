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

  @ApiProperty({ type: String })
  @Transform(({ value }) => value.name)
  brand: Brand;

  @ApiProperty({ type: String })
  @Transform(({ value }) => value.name)
  origin_country: Country;

  @ApiProperty({ type: String })
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
