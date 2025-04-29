import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { config } from 'dotenv';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
config();

const migrations = {
  directory: path.join(__dirname, 'db', 'migrations'),
};

const seeds = {
  directory: path.join(__dirname, 'db', 'seeds'),
};

const development = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  useNullAsDefault: true,
  migrations,
  seeds,
};

const test = {
  client: 'sqlite3',
  connection: ':memory:',
  useNullAsDefault: true,
  debug: true,
  migrations,
  seeds,
};

const production = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
  useNullAsDefault: true,
  migrations,
  seeds,
};

const configObject = {
  development,
  test,
  production,
};

export default configObject;
