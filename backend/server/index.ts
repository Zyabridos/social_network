import fastify from 'fastify';

import init from './plugin/init.ts';

const buildApp = async () => {
  const app = fastify({ logger: true });
  await init(app);
  await app.ready();
  return app;
};

export default buildApp;
