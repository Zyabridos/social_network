import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config as loadDotenv } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath =
  process.env.NODE_ENV === 'docker'
    ? path.resolve(__dirname, '../.env.docker')
    : path.resolve(__dirname, '../.env');

loadDotenv({ path: envPath });

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST = 'localhost',
  POSTGRES_PORT = '5432',
  DATABASE_URL,
} = process.env;

const dbUrl =
  DATABASE_URL ||
  `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?sslmode=require`;

const connectionConfig = {
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false },
};

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
    connection: connectionConfig,
    ...shared,
  },
  development: {
    client: 'pg',
    connection: connectionConfig,
    ...shared,
  },
  production: {
    client: 'pg',
    connection: connectionConfig,
    ...shared,
  },
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    ...shared,
  },
};

export default configObject;
