import path from 'path';
import { fileURLToPath } from 'url';

import { config as loadDotenv } from 'dotenv';
import knex, { Knex } from 'knex';

// @ts-expect-error: for now knexfile is JS, no types
import knexConfig from '../server/knexfile.js';

import waitForDbConnection from './waitForDb.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootPath = path.resolve(__dirname, '..', '..');

loadDotenv({ path: path.join(rootPath, '.env') });

const env = process.env.NODE_ENV || 'development';
const config = knexConfig[env] as Knex.Config;

if (!config) {
  console.error(`❌ No knex config found for NODE_ENV=${env}`);
  process.exit(1);
}

const db = knex(config);

(async () => {
  try {
    console.log(`Running migrations for environment: ${env}`);
    await waitForDbConnection(db);
    const [batchNo, log] = await db.migrate.latest();
    console.log(`✅ Batch ${batchNo} completed with ${log.length} migrations:`);
    log.forEach((m: string) => console.log(`  - ${m}`));
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration error:', err);
    process.exit(1);
  }
})();
