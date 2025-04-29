import { FastifyInstance } from 'fastify';

import registerRoutes from '../routes/index.js';

import registerPlugins from './plugins/registerPlugins.js';

const init = async (
  app: FastifyInstance,
  opts: { knex?: ReturnType<typeof import('knex')> } = {},
): Promise<FastifyInstance> => {
  await registerPlugins(app, opts); // <-- сюда передаём opts
  await registerRoutes(app);
  return app;
};

export default init;
