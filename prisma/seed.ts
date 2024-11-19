import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed brands
  const brand1 = await prisma.brand.upsert({
    where: { name: 'Rolex' },
    update: {},
    create: { name: 'Rolex' },
  });

  const brand2 = await prisma.brand.upsert({
    where: { name: 'Patek Philippe' },
    update: {},
    create: { name: 'Patek Philippe' },
  });

  const brand3 = await prisma.brand.upsert({
    where: { name: 'Audemars Piguet' },
    update: {},
    create: { name: 'Audemars Piguet' },
  });

  // Seed currencies
  const currencyUSD = await prisma.currency.upsert({
    where: { name: 'USD' },
    update: {},
    create: { name: 'USD' },
  });

  const currencyEUR = await prisma.currency.upsert({
    where: { name: 'EUR' },
    update: {},
    create: { name: 'EUR' },
  });

  // Seed countries
  const countrySwitzerland = await prisma.country.upsert({
    where: { name: 'Switzerland' },
    update: {},
    create: { name: 'Switzerland' },
  });

  const countryFrance = await prisma.country.upsert({
    where: { name: 'France' },
    update: {},
    create: { name: 'France' },
  });

  // Seed watches
  await prisma.watch.upsert({
    where: { reference_number: '116610LN' },
    update: {},
    create: {
      name: 'Rolex Submariner',
      reference_number: '116610LN',
      retail_price: 8500,
      release_date: new Date('2020-09-01'),
      brandId: brand1.id,
      currencyId: currencyUSD.id,
      countryId: countrySwitzerland.id,
    },
  });

  await prisma.watch.upsert({
    where: { reference_number: '116500LN' },
    update: {},
    create: {
      name: 'Rolex Daytona',
      reference_number: '116500LN',
      retail_price: 13500,
      release_date: new Date('2021-05-01'),
      brandId: brand1.id,
      currencyId: currencyUSD.id,
      countryId: countrySwitzerland.id,
    },
  });

  await prisma.watch.upsert({
    where: { reference_number: '5711/1A' },
    update: {},
    create: {
      name: 'Patek Philippe Nautilus',
      reference_number: '5711/1A',
      retail_price: 30000,
      release_date: new Date('2019-11-01'),
      brandId: brand2.id,
      currencyId: currencyEUR.id,
      countryId: countrySwitzerland.id,
    },
  });

  await prisma.watch.upsert({
    where: { reference_number: '5196R' },
    update: {},
    create: {
      name: 'Patek Philippe Calatrava',
      reference_number: '5196R',
      retail_price: 25000,
      release_date: new Date('2018-03-01'),
      brandId: brand2.id,
      currencyId: currencyEUR.id,
      countryId: countrySwitzerland.id,
    },
  });

  await prisma.watch.upsert({
    where: { reference_number: '15500ST' },
    update: {},
    create: {
      name: 'Audemars Piguet Royal Oak',
      reference_number: '15500ST',
      retail_price: 24000,
      release_date: new Date('2022-01-15'),
      brandId: brand3.id,
      currencyId: currencyEUR.id,
      countryId: countrySwitzerland.id,
    },
  });

  await prisma.watch.upsert({
    where: { reference_number: '26470ST' },
    update: {},
    create: {
      name: 'Audemars Piguet Royal Oak Offshore',
      reference_number: '26470ST',
      retail_price: 35000,
      release_date: new Date('2023-06-10'),
      brandId: brand3.id,
      currencyId: currencyEUR.id,
      countryId: countrySwitzerland.id,
    },
  });

  await prisma.watch.upsert({
    where: { reference_number: '124300' },
    update: {},
    create: {
      name: 'Rolex Oyster Perpetual',
      reference_number: '124300',
      retail_price: 5700,
      release_date: new Date('2020-09-01'),
      brandId: brand1.id,
      currencyId: currencyUSD.id,
      countryId: countrySwitzerland.id,
    },
  });

  await prisma.watch.upsert({
    where: { reference_number: '126334' },
    update: {},
    create: {
      name: 'Rolex Datejust',
      reference_number: '126334',
      retail_price: 9000,
      release_date: new Date('2018-07-01'),
      brandId: brand1.id,
      currencyId: currencyUSD.id,
      countryId: countrySwitzerland.id,
    },
  });

  await prisma.watch.upsert({
    where: { reference_number: '5167A' },
    update: {},
    create: {
      name: 'Patek Philippe Aquanaut',
      reference_number: '5167A',
      retail_price: 21000,
      release_date: new Date('2021-10-01'),
      brandId: brand2.id,
      currencyId: currencyEUR.id,
      countryId: countrySwitzerland.id,
    },
  });

  await prisma.watch.upsert({
    where: { reference_number: '15180OR' },
    update: {},
    create: {
      name: 'Audemars Piguet Jules Audemars',
      reference_number: '15180OR',
      retail_price: 40000,
      release_date: new Date('2017-02-01'),
      brandId: brand3.id,
      currencyId: currencyEUR.id,
      countryId: countryFrance.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
