import { FastifyInstance } from 'fastify';
import welcome from './welcome';

const controllers = [welcome];

const registerControllers = (app: FastifyInstance): void => {
  controllers.forEach((f) => f(app));
};

export default registerControllers;
