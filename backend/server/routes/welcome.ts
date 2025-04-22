import { FastifyInstance } from 'fastify';

const welcome = async (app: FastifyInstance): Promise<void> => {
  app.get('/api', async (_req, reply) => {
    reply.send({ message: 'Welcome to the API root' });
  });
};

export default welcome;
