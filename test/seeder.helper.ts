import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SeederHelper {
  static async reseed() {
    console.log('Reseeding database...');

    // Clear all tables (order matters due to FK constraints)
    await prisma.watch.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.currency.deleteMany();
    await prisma.country.deleteMany();
    await prisma.account.deleteMany();
    await prisma.role.deleteMany();

    // seed role
    const adminRole = await prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: { name: 'admin' },
    });

    const userRole = await prisma.role.upsert({
      where: { name: 'user' },
      update: {},
      create: { name: 'user' },
    });

    // seed account
    await prisma.account.upsert({
      where: { username: 'alief' },
      update: {},
      create: {
        username: 'alief',
        password: 'random123',
        roleId: adminRole.id,
      },
    });

    await prisma.account.upsert({
      where: { username: 'dany' },
      update: {},
      create: { username: 'dany', password: 'random123', roleId: userRole.id },
    });

    // Seed watches with connectOrCreate relationships
    const brands = [
      'Rolex',
      'Omega',
      'Cartier',
      'Seiko',
      'Casio',
      'Tag Heuer',
      'Audemars Piguet',
      'Patek Philippe',
    ];
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CHF'];
    const countries = ['Switzerland', 'Japan', 'Germany', 'France', 'Italy'];

    for (let i = 1; i <= 50; i++) {
      const randomBrand = brands[Math.floor(Math.random() * brands.length)];
      const randomCurrency =
        currencies[Math.floor(Math.random() * currencies.length)];
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)];

      await prisma.watch.create({
        data: {
          name: `${randomBrand} Model ${i}`, // Watch name includes brand and model
          reference_number: `REF-${1000 + i}`, // Unique reference number
          retail_price: Math.floor(Math.random() * 10000) + 1000, // Price between 1000 and 11000
          release_date: new Date(
            2020 + (i % 5),
            i % 12,
            (i % 28) + 1,
          ).toISOString(), // Spread over years 2020-2024
          brand: {
            connectOrCreate: {
              where: { name: randomBrand },
              create: { name: randomBrand },
            },
          },
          currency: {
            connectOrCreate: {
              where: { name: randomCurrency },
              create: { name: randomCurrency },
            },
          },
          origin_country: {
            connectOrCreate: {
              where: { name: randomCountry },
              create: { name: randomCountry },
            },
          },
        },
      });
    }
  }
}
