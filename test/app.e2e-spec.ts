import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { WatchEntity } from 'src/watches/entities/watch.entity';
import { AuthHelper } from './auth.helper';
import { SeederHelper } from './seeder.helper';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await SeederHelper.reseed();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to The Watch Catalog API!');
  });

  it('POST /watches - Create a new watch', async () => {
    const createWatchDto = {
      name: 'Daytona',
      brand: 'Rolex',
      reference_number: '116500LN',
      retail_price: 14000,
      currency: 'USD',
      release_date: '2024-01-01',
      origin_country: 'Switzerland',
    };

    const accessToken = await AuthHelper.getAccessToken(app);

    const response = await request(app.getHttpServer())
      .post('/watches')
      .set('Authorization', `Bearer ${accessToken}`) // Simulate auth
      .send(createWatchDto);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(createWatchDto.name);
    expect(response.body.brand).toBe(createWatchDto.brand);
  });

  it('GET /watches - Retrieve all watches', async () => {
    const response = await request(app.getHttpServer()).get('/watches');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeLessThanOrEqual(51);
  });

  it('GET /watches - Filter watches by brand', async () => {
    const response = await request(app.getHttpServer())
      .get('/watches')
      .query({ brand: 'Rolex' });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((watch: WatchEntity) => {
      expect(watch.brand).toBe('Rolex');
    });
  });

  it('GET /watches/:id - Get details of a watch', async () => {
    const watchId = (await request(app.getHttpServer()).get('/watches')).body[0]
      .id;

    const response = await request(app.getHttpServer()).get(
      `/watches/${watchId}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', watchId);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('brand');
  });

  it('PATCH /watches/:id - Update a watch (except name)', async () => {
    const watchId = (await request(app.getHttpServer()).get('/watches')).body[0]
      .id;

    const updateDto = {
      reference_number: '116500LN-new',
      retail_price: 14500,
      release_date: '2024-02-01',
      brand: 'Rolex',
      currency: 'USD',
      origin_country: 'Switzerland',
    };

    const accessToken = await AuthHelper.getAccessToken(app);

    const response = await request(app.getHttpServer())
      .patch(`/watches/${watchId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateDto);

    expect(response.status).toBe(200);
    expect(response.body.reference_number).toBe(updateDto.reference_number);
    expect(response.body.retail_price).toBe(updateDto.retail_price);
  });

  it('GET /watches - Pagination test', async () => {
    const response = await request(app.getHttpServer())
      .get('/watches')
      .query({ page: 2, take: 5 });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeLessThanOrEqual(5);
  });

  it('POST /watches - Fail to create watch without auth', async () => {
    const createWatchDto = {
      name: 'Daytona',
      brand: 'Rolex',
      reference_number: '116500LN',
      retail_price: 14000,
      currency: 'USD',
      release_date: '2024-01-01',
      origin_country: 'Switzerland',
    };

    const response = await request(app.getHttpServer())
      .post('/watches')
      .send(createWatchDto); // No Authorization header

    expect(response.status).toBe(401);
  });

  it('PATCH /watches/:id - Fail to update watch without auth', async () => {
    const watchId = (await request(app.getHttpServer()).get('/watches')).body[0]
      .id;

    const updateDto = {
      reference_number: '116500LN-new',
      retail_price: 14500,
      release_date: '2024-02-01',
      brand: 'Rolex',
      currency: 'USD',
      origin_country: 'Switzerland',
    };

    const response = await request(app.getHttpServer())
      .patch(`/watches/${watchId}`)
      .send(updateDto);

    expect(response.status).toBe(401);
  });

  it('GET /watches - Search by name or reference number', async () => {
    const response = await request(app.getHttpServer())
      .get('/watches')
      .query({ search: 'REF1001' });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((watch: WatchEntity) => {
      expect(watch.reference_number).toContain('REF1001');
    });
  });
});
