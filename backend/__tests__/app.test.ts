import { describe, test, expect, beforeAll } from 'vitest';
import buildApp from '../server/index.ts';

describe('API root and health check', () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeAll(async () => {
    app = await buildApp();
  });

  test('should return welcome message at /api', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toHaveProperty('message');
  });

  test('should return DB status at /api/health', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/health',
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);

    expect(body).toHaveProperty('status', 'ok');
    expect(body).toHaveProperty('db', 'connected');
  });
});
