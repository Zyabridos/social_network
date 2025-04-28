import { FastifyInstance } from 'fastify';

import db from '../db/initDb.js';

const routes = async (app: FastifyInstance): Promise<void> => {
  app.get('/api', async (_req, reply) => {
    reply.send({ message: 'Welcome to the API root' });
  });

  app.get('/api/health', async (_req, reply) => {
    try {
      await db.raw('SELECT 1');
      reply.send({ status: 'ok', db: 'connected' });
    } catch (error) {
      app.log.error(error);
      reply.status(500).send({ status: 'error', db: 'disconnected' });
    }
  });
};

export default routes;
