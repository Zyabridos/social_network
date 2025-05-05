import knex from 'knex';

// @ts-expect-error: knexfile is JS, no types
import knexConfig from '../server/knexfile.js';

const env = process.env.NODE_ENV || 'development';
const config = knexConfig[env];

if (!config) {
  console.error(`❌ No knex config found for NODE_ENV=${env}`);
  process.exit(1);
}

const db = knex(config);

(async () => {
  try {
    console.log(`Seeding for env: ${env}`);
    await db.seed.run();
    console.log('✅ Seeding done!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
})();
