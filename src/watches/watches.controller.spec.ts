import { Test, TestingModule } from '@nestjs/testing';
import { WatchesController } from './watches.controller';
import { WatchesService } from './watches.service';
import { WatchEntity } from './entities/watch.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateWatchDto } from './dto/create-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';
import { GetWatchDto } from './dto/get-watch.dto';

describe('WatchesController', () => {
  let controller: WatchesController;
  let service: WatchesService;

  const mockWatchEntity = new WatchEntity({
    id: 1,
    name: 'Submariner',
    reference_number: '12345',
    retail_price: 10000,
    release_date: new Date('2023-01-01'),
    brand: { id: 1, name: 'Rolex' },
    origin_country: { id: 1, name: 'Switzerland' },
    currency: { id: 1, name: 'USD' },
  });

  const mockWatches = [mockWatchEntity];

  const mockWatchesService = {
    create: jest.fn().mockResolvedValue(mockWatchEntity),
    findMany: jest.fn().mockResolvedValue(mockWatches),
    findOne: jest.fn().mockResolvedValue(mockWatchEntity),
    update: jest.fn().mockResolvedValue(mockWatchEntity),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatchesController],
      providers: [
        {
          provide: WatchesService,
          useValue: mockWatchesService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<WatchesController>(WatchesController);
    service = module.get<WatchesService>(WatchesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new watch', async () => {
      const createWatchDto: CreateWatchDto = {
        name: 'Submariner',
        reference_number: '12345',
        retail_price: 10000,
        release_date: new Date('2023-01-01'),
        brand: 'Rolex',
        currency: 'USD',
        origin_country: 'Switzerland',
      };

      const result = await controller.create(createWatchDto);
      expect(result).toEqual(mockWatchEntity);
      expect(service.create).toHaveBeenCalledWith(createWatchDto);
    });
  });

  describe('findMany', () => {
    it('should return an array of watches', async () => {
      const getWatchDto: GetWatchDto = {
        search: '',
        brand: '',
        page: 1,
        take: 10,
      };
      const result = await controller.findMany(getWatchDto);

      expect(result).toEqual(mockWatches);
      expect(service.findMany).toHaveBeenCalledWith(getWatchDto);
    });
  });

  describe('findOne', () => {
    it('should return a single watch by id', async () => {
      const result = await controller.findOne(1);

      expect(result).toEqual(mockWatchEntity);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update and return the updated watch', async () => {
      const updateWatchDto: UpdateWatchDto = {
        name: 'Updated Submariner',
        reference_number: '54321',
        retail_price: 12000,
        release_date: new Date('2024-01-01'),
        brand: 'Updated Rolex',
        currency: 'EUR',
        origin_country: 'Germany',
      };

      const result = await controller.update(1, updateWatchDto);
      expect(result).toEqual(mockWatchEntity);
      expect(service.update).toHaveBeenCalledWith(1, updateWatchDto);
    });
  });
});
