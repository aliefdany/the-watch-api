import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWatchDto } from './dto/create-watch.dto';
import { GetWatchDto } from './dto/get-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';
import { Watch } from '@prisma/client';

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

    let brand = await this.prisma.brand.findUnique({
      where: { name: brandName },
    });

    if (!brand) {
      brand = await this.prisma.brand.create({ data: { name: brandName } });
    }

    let country = await this.prisma.country.findUnique({
      where: { name: countryName },
    });

    if (!country) {
      country = await this.prisma.country.create({
        data: { name: countryName },
      });
    }

    let currency = await this.prisma.currency.findUnique({
      where: { name: currencyName },
    });

    if (!currency) {
      currency = await this.prisma.currency.create({
        data: { name: currencyName },
      });
    }

    return await this.prisma.watch.create({
      data: {
        name,
        reference_number,
        retail_price,
        release_date,
        brandId: brand.id,
        currencyId: currency.id,
        countryId: country.id,
      },
      include: { brand: true, currency: true, origin_country: true },
    });
  }

  async findMany(data: GetWatchDto): Promise<Watch[]> {
    const { search, brand } = data;

    let { page, take } = data;

    const totalWatches = await this.prisma.watch.count();

    if (!page) {
      page = 1;
    }

    if (!take) {
      take = totalWatches;
    }

    const skip = (page - 1) * take;

    return await this.prisma.watch.findMany({
      where: {
        OR: [
          { name: { contains: search } },
          { reference_number: { contains: search } },
        ],
        brand: {
          name: { contains: brand },
        },
      },
      skip,
      take,
      include: { brand: true, currency: true, origin_country: true },
    });
  }

  async findOne(id: number): Promise<Watch> {
    const watch = await this.prisma.watch.findUnique({
      where: { id },
      include: { brand: true, currency: true, origin_country: true },
    });

    if (!watch) {
      throw new NotFoundException(`Watch with id ${id} is not found`);
    }

    return watch;
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

    const watch = await this.prisma.watch.findUnique({ where: { id } });

    if (!watch) {
      throw new NotFoundException(`Watch with id ${id} is not found`);
    }

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

    let currency = await this.prisma.currency.findFirst({
      where: { name: currencyName },
    });

    if (!currency) {
      currency = await this.prisma.currency.create({
        data: { name: currencyName },
      });
    }

    return await this.prisma.watch.update({
      where: { id },
      data: {
        reference_number,
        release_date,
        retail_price,
        brandId: brand.id,
        countryId: country.id,
        currencyId: currency.id,
      },
      include: { brand: true, currency: true, origin_country: true },
    });
  }
}
