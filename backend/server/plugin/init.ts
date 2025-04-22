import { FastifyInstance } from 'fastify';

import registerRoutes from '../routes/index';

import registerPlugins from './plugins/registerPlugins';

const init = async (app: FastifyInstance): Promise<FastifyInstance> => {
  await registerPlugins(app, '');
  await registerRoutes(app);
  return app;
};

export default init;
