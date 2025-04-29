import { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance): Promise<void> => {
  const { Post } = app.models;

  app.get('/api/posts', async (_req, reply) => {
    const posts = await Post.query().select('id', 'name', 'createdAt');
    reply.send(posts);
  });
};
