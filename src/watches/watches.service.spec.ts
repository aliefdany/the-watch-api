import { Test, TestingModule } from '@nestjs/testing';
import { WatchesService } from './watches.service';
import { PrismaService } from '../prisma/prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { WatchEntity } from './entities/watch.entity';
import { NotFoundException } from '@nestjs/common';

describe('WatchesService', () => {
  let service: WatchesService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const prismaMock = mockDeep<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WatchesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<WatchesService>(WatchesService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new watch', async () => {
      const createWatchDto = {
        name: 'Rolex Submariner',
        reference_number: '12345',
        retail_price: 10000,
        release_date: '2023-01-01',
        brand: 'Rolex',
        currency: 'USD',
        origin_country: 'Switzerland',
      };
      const brand = { id: 1, name: 'Rolex' };
      const country = { id: 1, name: 'Switzerland' };
      const currency = { id: 1, name: 'USD' };
      const mockWatch: WatchEntity = {
        id: 1,
        name: 'Rolex Submariner',
        reference_number: '12345',
        retail_price: 10000,
        release_date: new Date('2023-01-01'),
        brand,
        origin_country: country,
        currency,
        brandId: brand.id,
        currencyId: currency.id,
        countryId: country.id,
      };
      prisma.brand.findUnique.mockResolvedValue(null);
      prisma.brand.create.mockResolvedValue(brand);
      prisma.country.findUnique.mockResolvedValue(null);
      prisma.country.create.mockResolvedValue(country);
      prisma.currency.findUnique.mockResolvedValue(null);
      prisma.currency.create.mockResolvedValue(currency);
      prisma.watch.create.mockResolvedValue(mockWatch);
      const result = await service.create(createWatchDto);
      expect(result).toEqual(mockWatch);
      expect(prisma.brand.create).toHaveBeenCalledWith({
        data: { name: 'Rolex' },
      });
      expect(prisma.country.create).toHaveBeenCalledWith({
        data: { name: 'Switzerland' },
      });
      expect(prisma.currency.create).toHaveBeenCalledWith({
        data: { name: 'USD' },
      });
      expect(prisma.watch.create).toHaveBeenCalled();
    });
  });

  describe('findMany', () => {
    it('should return a list of watches', async () => {
      const brand = { id: 1, name: 'Rolex' };
      const country = { id: 1, name: 'Switzerland' };
      const currency = { id: 1, name: 'USD' };

      const mockWatches: WatchEntity[] = [
        {
          id: 1,
          name: 'Watch 1',
          reference_number: '12345',
          retail_price: 10000,
          release_date: new Date('2023-01-01'),
          brand,
          origin_country: country,
          currency,
          brandId: brand.id,
          currencyId: currency.id,
          countryId: country.id,
        },
        {
          id: 2,
          name: 'Watch 2',
          reference_number: '67890',
          retail_price: 10000,
          release_date: new Date('2023-01-01'),
          brand,
          origin_country: country,
          currency,
          brandId: brand.id,
          currencyId: currency.id,
          countryId: country.id,
        },
      ];

      prisma.watch.findMany.mockResolvedValue(mockWatches);

      const result = await service.findMany({
        search: '',
        brand: '',
        page: 1,
        take: 10,
      });

      expect(result).toEqual(mockWatches);
      expect(prisma.watch.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a watch if found', async () => {
      const brand = { id: 1, name: 'Rolex' };
      const country = { id: 1, name: 'Switzerland' };
      const currency = { id: 1, name: 'USD' };

      const mockWatch: WatchEntity = {
        id: 1,
        name: 'Rolex Submariner',
        reference_number: '12345',
        retail_price: 10000,
        release_date: new Date('2023-01-01'),
        brand,
        origin_country: country,
        currency,
        brandId: brand.id,
        currencyId: currency.id,
        countryId: country.id,
      };
      prisma.watch.findUnique.mockResolvedValue(mockWatch);

      const result = await service.findOne(1);

      expect(result).toEqual(mockWatch);
      expect(prisma.watch.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { brand: true, currency: true, origin_country: true },
      });
    });

    it('should throw a NotFoundException if the watch is not found', async () => {
      prisma.watch.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a watch successfully', async () => {
      const brand = { id: 2, name: 'Omega' };
      const country = { id: 2, name: 'Germany' };
      const currency = { id: 2, name: 'EUR' };

      const updateWatchDto = {
        reference_number: '67890',
        retail_price: 15000,
        release_date: '2024-01-01',
        brand: 'Omega',
        currency: 'EUR',
        origin_country: 'Germany',
      };

      const mockWatch: WatchEntity = {
        id: 2,
        name: 'Rolex Submariner',
        reference_number: '12345',
        retail_price: 10000,
        release_date: new Date('2023-01-01'),
        brand,
        origin_country: country,
        currency,
        brandId: brand.id,
        currencyId: currency.id,
        countryId: country.id,
      };

      prisma.watch.findUnique.mockResolvedValue({
        id: 2,
        name: 'Omega Submariner',
        reference_number: '12345',
        retail_price: 10000,
        release_date: new Date('2023-01-01'),
        brandId: brand.id,
        currencyId: currency.id,
        countryId: country.id,
      });
      prisma.brand.findFirst.mockResolvedValue({ id: 2, name: 'Omega' });
      prisma.country.findFirst.mockResolvedValue({ id: 2, name: 'Germany' });
      prisma.currency.findFirst.mockResolvedValue({ id: 2, name: 'EUR' });
      prisma.watch.update.mockResolvedValue(mockWatch);

      const result = await service.update(1, updateWatchDto);

      expect(result).toEqual(mockWatch);
      expect(prisma.watch.update).toHaveBeenCalled();
    });

    it('should throw a NotFoundException if the watch to update is not found', async () => {
      const updateWatchDto = {
        reference_number: '67890',
        retail_price: 15000,
        release_date: '2024-01-01',
        brand: 'Omega',
        currency: 'EUR',
        origin_country: 'Germany',
      };

      prisma.watch.findUnique.mockResolvedValue(null);

      await expect(service.update(1, updateWatchDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
