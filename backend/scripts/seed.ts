import path from 'path';
import { fileURLToPath } from 'url';
import { exit } from 'process';

import { config as loadDotenv } from 'dotenv';
import knex from 'knex';

// @ts-expect-error: for now knexfile is JS, no types
import knexConfig from '../server/knexfile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

loadDotenv({ path: path.resolve(__dirname, '../.env.docker'), override: true });

const env = process.env.NODE_ENV || 'development';
// const env = 'docker';
const config = knexConfig[env];
const db = knex(config);

try {
  console.log(`Seeding for env: ${env}`);
  await db.seed.run();
  console.log('✅ Seeding done!');
  exit(0);
} catch (err) {
  console.error('❌ Seeding error:', err);
  exit(1);
}
