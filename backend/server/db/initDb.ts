import knex from 'knex';
import { Model } from 'objection';

// @ts-expect-error: knexfile is CommonJS and has no default export
import knexConfig from '../../knexfile.cjs';
import 'dotenv/config';

type Environment = 'development' | 'test' | 'production';

const env = (process.env.NODE_ENV || 'development') as Environment;
const config = knexConfig[env];

const db = knex(config);
Model.knex(db);

export default db;
