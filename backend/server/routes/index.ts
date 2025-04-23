import { FastifyInstance } from 'fastify';

import welcome from './health.ts';

const controllers = [welcome];

const registerControllers = (app: FastifyInstance): void => {
  controllers.forEach((f) => f(app));
};

export default registerControllers;
