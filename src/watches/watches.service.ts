import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Watch } from '@prisma/client';
import { CreateWatchDto } from './dto/create-watch.dto';
import { SearchWatchDto } from './dto/search-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';

@Injectable()
export class WatchesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateWatchDto): Promise<Watch> {
    const {
      name,
      reference_number,
      retail_price,
      release_date,
      brand: brandName,
      currency: currencyName,
      origin_country: countryName,
    } = data;

    let brand = await this.prisma.brand.findFirst({
      where: { name: brandName },
    });

    if (!brand) {
      brand = await this.prisma.brand.create({ data: { name: brandName } });
    }

    let country = await this.prisma.country.findFirst({
      where: { name: countryName },
    });

    if (!country) {
      country = await this.prisma.country.create({
        data: { name: countryName },
      });
    }

    let currency = await this.prisma.country.findFirst({
      where: { name: currencyName },
    });

    if (!currency) {
      currency = await this.prisma.currency.create({
        data: { name: currencyName },
      });
    }

    return this.prisma.watch.create({
      data: {
        name,
        reference_number,
        retail_price,
        release_date: new Date(release_date),
        brandId: brand.id,
        currencyId: currency.id,
        countryId: country.id,
      },
    });
  }

  async findMany(data: SearchWatchDto): Promise<Watch[]> {
    const { name, reference_number, total_items, page, take } = data;

    const skip = total_items * page;

    return this.prisma.watch.findMany({
      where: { OR: [{ name }, { reference_number }] },
      skip,
      take,
    });
  }

  async findOne(id: number) {
    return this.prisma.watch.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateWatchDto): Promise<Watch> {
    const {
      reference_number,
      retail_price,
      release_date,
      brand: brandName,
      currency: currencyName,
      origin_country: countryName,
    } = data;

    let brand = await this.prisma.brand.findFirst({
      where: { name: brandName },
    });

    if (!brand) {
      brand = await this.prisma.brand.create({ data: { name: brandName } });
    }

    let country = await this.prisma.country.findFirst({
      where: { name: countryName },
    });

    if (!country) {
      country = await this.prisma.country.create({
        data: { name: countryName },
      });
    }

    let currency = await this.prisma.country.findFirst({
      where: { name: currencyName },
    });

    if (!currency) {
      currency = await this.prisma.currency.create({
        data: { name: currencyName },
      });
    }

    return this.prisma.watch.update({
      where: { id },
      data: {
        reference_number,
        release_date,
        retail_price,
        brandId: brand.id,
        countryId: country.id,
        currencyId: currency.id,
      },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} watch`;
  // }
}
