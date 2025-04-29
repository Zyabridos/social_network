import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import knex from 'knex';
import knexConfig from '../server/knexfile.js'; 
import buildApp from '../server/index.ts';

let app: Awaited<ReturnType<typeof buildApp>>;
let db: ReturnType<typeof knex>;

beforeAll(async () => {
  db = knex(knexConfig.test);
  await db.migrate.latest();
  app = await buildApp({ knex: db });
});

afterAll(async () => {
  await app.close();
  await db.destroy();
});

describe('Posts API', () => {
  it('POST /api/posts should title, content and id', async () => {
    const params = { 
      title:"My first post",
      content:"Hello, world!",
    }
    const response = await app.inject({
      method: 'POST',
      url: '/api/posts',
      payload: params,
      headers: {
        'content-type': 'application/json'
      }
    });

    const post = JSON.parse(response.body);

    expect(response.statusCode).toBe(201);
    expect(post).toMatchObject({
      title: params.title,
      content: params.content,
    });
    expect(post).toHaveProperty('id');
    expect(typeof post.id).toBe('number');
  });

  it('GET /api/posts should return 200 and array of posts', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/posts',
    });

    expect(response.statusCode).toBe(200);

    const posts = JSON.parse(response.body);
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length !== 0)
  });
});
