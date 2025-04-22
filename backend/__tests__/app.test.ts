import buildApp from '../server/index';

test('should return welcome message', async () => {
  const app = await buildApp();
  const response = await app.inject({
    method: 'GET',
    url: '/api',
  });

  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toHaveProperty('message');
});
