import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWatchDto } from './dto/create-watch.dto';
import { GetWatchDto } from './dto/get-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';
import { WatchEntity } from './entities/watch.entity';

@Injectable()
export class WatchesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateWatchDto): Promise<WatchEntity> {
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

    let currency = await this.prisma.currency.findFirst({
      where: { name: currencyName },
    });

    if (!currency) {
      currency = await this.prisma.currency.create({
        data: { name: currencyName },
      });
    }

    const newWatch = await this.prisma.watch.create({
      data: {
        name,
        reference_number,
        retail_price,
        release_date: new Date(release_date),
        brandId: brand.id,
        currencyId: currency.id,
        countryId: country.id,
      },
      include: { brand: true, currency: true, origin_country: true },
    });

    return {
      id: newWatch.id,
      name: newWatch.name,
      reference_number: newWatch.reference_number,
      release_date: newWatch.release_date,
      retail_price: newWatch.retail_price,
      brand: newWatch.brand.name,
      origin_country: newWatch.origin_country.name,
      currency: newWatch.currency.name,
    };
  }

  async findMany(data: GetWatchDto): Promise<WatchEntity[]> {
    const { search } = data;

    let { page, take } = data;

    const totalWatches = await this.prisma.watch.count();

    if (!page) {
      page = 1;
    }

    if (!take) {
      take = totalWatches;
    }

    const skip = (page - 1) * take;

    const watches = await this.prisma.watch.findMany({
      where: {
        OR: [
          { name: { contains: search } },
          { reference_number: { contains: search } },
        ],
      },
      skip,
      take,
      include: { brand: true, currency: true, origin_country: true },
    });

    return watches.map((watch) => ({
      id: watch.id,
      name: watch.name,
      reference_number: watch.reference_number,
      release_date: watch.release_date,
      retail_price: watch.retail_price,
      brand: watch.brand.name,
      origin_country: watch.origin_country.name,
      currency: watch.currency.name,
    }));
  }

  async findOne(id: number): Promise<WatchEntity> {
    const watch = await this.prisma.watch.findUnique({
      where: { id },
      include: { brand: true, currency: true, origin_country: true },
    });

    return {
      id: watch.id,
      name: watch.name,
      reference_number: watch.reference_number,
      release_date: watch.release_date,
      retail_price: watch.retail_price,
      brand: watch.brand.name,
      origin_country: watch.origin_country.name,
      currency: watch.currency.name,
    };
  }

  async update(id: number, data: UpdateWatchDto): Promise<WatchEntity> {
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

    const updatedWatch = await this.prisma.watch.update({
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

    return {
      id: updatedWatch.id,
      name: updatedWatch.name,
      reference_number: updatedWatch.reference_number,
      release_date: updatedWatch.release_date,
      retail_price: updatedWatch.retail_price,
      brand: updatedWatch.brand.name,
      origin_country: updatedWatch.origin_country.name,
      currency: updatedWatch.currency.name,
    };
  }

  // remove(id: number) {
  //   return `This action removes a #${id} watch`;
  // }
}
