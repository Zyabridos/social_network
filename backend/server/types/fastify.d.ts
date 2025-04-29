import { Knex } from 'knex';

import { models } from '../models/index.js';

declare module 'fastify' {
  interface FastifyInstance {
    db: Knex;
    models: typeof models;
  }
}
