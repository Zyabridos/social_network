import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';

dotenv.config();

const registerPlugins = async (app: FastifyInstance, _opts: any): Promise<void> => {
  await app.register(fastifyCors, {
    origin: true,
    credentials: true,
  });

  app.decorate('reverse', (routeName: string): string => {
    const routes: Record<string, string> = {
      root: '/',
    };
    return routes[routeName] || '/';
  });
};

export default fastifyPlugin(registerPlugins);
