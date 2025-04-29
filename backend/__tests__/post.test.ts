import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import knex from 'knex';
import knexConfig from '../server/knexfile.js'; 
import buildApp from '../server/index.ts'; // ← поправить здесь

let app: Awaited<ReturnType<typeof buildApp>>;
let db: ReturnType<typeof knex>;

beforeAll(async () => {
  db = knex(knexConfig.test);         // создаём БД
  await db.migrate.latest();           // миграции на БД
  app = await buildApp({ knex: db });  // ← передаём её в приложение
});

afterAll(async () => {
  await app.close();
  await db.destroy();
});

describe('Posts API', () => {
  it('GET /api/posts should return 200 and array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/posts',
    });

    expect(response.statusCode).toBe(200);

    const posts = JSON.parse(response.body);
    expect(Array.isArray(posts)).toBe(true);
  });
});
