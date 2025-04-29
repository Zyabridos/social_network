import { FastifyInstance } from 'fastify';

import { ValidationErrorType } from '../types/errors.js';

export default async (app: FastifyInstance): Promise<void> => {
  const { Post } = app.models;

  app.get('/api/posts', async (_req, reply) => {
    const posts = await Post.query().select('id', 'title', 'content', 'createdAt');
    reply.send(posts);
  });

  // curl -X POST http://localhost:5001/api/posts \
  // -H "Content-Type: application/json" \
  // -d '{"title": "My first post", "content": "Hello, world!"}'

  app.post('/api/posts', async (req, reply) => {
    try {
      const newPost = await Post.query().insert(req.body);
      reply.code(201).send(newPost);
    } catch (error) {
      const data = (error as ValidationErrorType).data;
      reply.code(422).send({ error: 'Validation failed', errors: data ?? error });
    }
  });
};
