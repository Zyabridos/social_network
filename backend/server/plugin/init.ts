import { FastifyInstance } from 'fastify';

import registerRoutes from '../routes/index.js';

import registerPlugins from './plugins/registerPlugins.js';

const init = async (app: FastifyInstance): Promise<FastifyInstance> => {
  await registerPlugins(app, '');
  await registerRoutes(app);
  return app;
};

export default init;
