import { Test, TestingModule } from '@nestjs/testing';
import { WatchesService } from './watches.service';
import { PrismaService } from '../prisma/prisma.service';

describe('WatchesService', () => {
  let service: WatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WatchesService, PrismaService],
    }).compile();

    service = module.get<WatchesService>(WatchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
