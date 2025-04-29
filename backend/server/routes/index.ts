import { FastifyInstance } from 'fastify';

import welcome from './health.js';
import posts from './posts.js';

const controllers = [welcome, posts];

const registerControllers = (app: FastifyInstance): void => {
  controllers.forEach((f) => f(app));
};

export default registerControllers;
