import fastify from 'fastify';
import knex from 'knex';
import type { Knex } from 'knex';

// @ts-expect-error - for now it is a .js file
import knexConfig from './knexfile.js';
import init from './plugin/init.js';

export default async function buildApp({ knex: externalKnex }: { knex?: Knex } = {}) {
  const app = fastify({ logger: true });

  const db = externalKnex || knex(knexConfig[process.env.NODE_ENV || 'development']);
  app.decorate('knex', db);

  await init(app, { knex: db });
  await app.ready();

  return app;
}
