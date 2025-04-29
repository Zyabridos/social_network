import knex from 'knex';
import { Model } from 'objection';

// @ts-expect-error - for now it is a .js file
import knexConfig from '../knexfile.js';
import 'dotenv/config';

type Environment = 'development' | 'test' | 'production';

const env = (process.env.NODE_ENV || 'development') as Environment;
const config = knexConfig[env];

const db = knex(config);
Model.knex(db);

export default db;
