import { FastifyInstance } from 'fastify';

import registerRoutes from '../routes/index.ts';

import registerPlugins from './plugins/registerPlugins.ts';

const init = async (app: FastifyInstance): Promise<FastifyInstance> => {
  await registerPlugins(app, '');
  await registerRoutes(app);
  return app;
};

export default init;
