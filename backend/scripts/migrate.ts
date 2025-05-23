import knex, { Knex } from 'knex';

// @ts-expect-error: knexfile is JS
import knexConfig from '../server/knexfile.js';

import waitForDbConnection from './waitForDb.js';

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
