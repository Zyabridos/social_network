import { FastifyInstance } from 'fastify';
import registerPlugins from './plugins/registerPlugins';
import registerRoutes from '../routes/index'

const init = async (app: FastifyInstance): Promise<FastifyInstance> => {
  await registerPlugins(app, '');
  await registerRoutes(app)
  return app;
};

export default init;
