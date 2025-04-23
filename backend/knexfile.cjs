const path = require('path');

const { config } = require('dotenv');
config();

const migrations = {
  directory: path.join(__dirname, 'server', 'db', 'migrations'),
};

const seeds = {
  directory: path.join(__dirname, 'server', 'db', 'seeds'),
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

module.exports = {
  development,
  test,
  production,
};
