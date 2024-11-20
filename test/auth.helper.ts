import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

export class AuthHelper {
  private static tokenCache: string | null = null;

  static async getAccessToken(app: INestApplication): Promise<string> {
    if (this.tokenCache) {
      return this.tokenCache;
    }

    const loginPayload = {
      username: 'alief',
      password: 'random123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginPayload);

    if (response.status !== 201) {
      throw new Error(
        `Failed to log in during test setup: ${response.status} ${response.text}`,
      );
    }

    const { accessToken } = response.body;
    this.tokenCache = accessToken;
    return accessToken;
  }
}
