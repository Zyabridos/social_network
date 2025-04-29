import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyCors from '@fastify/cors';
import knex from 'knex';
import { Model } from 'objection';
import dotenv from 'dotenv';

// @ts-expect-error - for now it is a .js file
import knexConfig from '../../knexfile.js';
import models from '../../models/index.js';
import { Environment } from '../../types/common.js';

dotenv.config();

const env = (process.env.NODE_ENV || 'development') as Environment;

const registerPlugins = async (
  app: FastifyInstance,
  opts: { knex?: ReturnType<typeof knex> } = {},
): Promise<void> => {
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

  const db = opts.knex ?? knex(knexConfig[env]);
  Model.knex(db);

  app.decorate('db', db);
  app.decorate('models', models);
};

export default fastifyPlugin(registerPlugins);
