import {
  CacheInterceptor,
  CacheModule,
  CacheStore,
  CACHE_MANAGER,
} from '@nestjs/cache-manager';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WatchesController } from '../src/watches/watches.controller';
import { WatchesService } from '../src/watches/watches.service';
import { PrismaService } from '../src/prisma/prisma.service';
import * as request from 'supertest';

describe('WatchesController with CacheInterceptor', () => {
  let app: INestApplication;
  let cacheManager: CacheStore;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          ttl: 60 * 1000,
        }),
      ],
      controllers: [WatchesController],
      providers: [WatchesService, CacheInterceptor, PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    cacheManager = moduleFixture.get(CACHE_MANAGER);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /watches - calculate the request when no cached data found', async () => {
    const response = await request(app.getHttpServer()).get('/watches');
    const cachedData = await cacheManager.get('/watches');

    expect(cachedData).toEqual(response.body);
  });

  it('GET /watches - should cache the GET request', async () => {
    const response = await request(app.getHttpServer()).get('/watches');

    const cachedData = await cacheManager.get('/watches');
    expect(cachedData).toEqual(response.body);
  });
});
