import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config as loadDotenv } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = process.env.NODE_ENV === 'docker'
  ? path.resolve(__dirname, '../.env.docker')
  : path.resolve(__dirname, '../.env');

loadDotenv({ path: envPath });

const migrations = {
  directory: path.join(__dirname, 'db', 'migrations'),
};

const seeds = {
  directory: path.join(__dirname, 'db', 'seeds'),
  extension: 'ts',
};

const shared = {
  useNullAsDefault: true,
  migrations,
  seeds,
  acquireTimeoutMillis: 5000,
};

const configObject = {
  docker: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ...shared,
  },
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ...shared,
    pool: {
      min: 2,
      max: 10,
    },
  },
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    debug: true,
    ...shared,
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    ...shared,
  },
};

export default configObject;
