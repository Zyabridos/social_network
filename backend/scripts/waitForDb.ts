import { Knex } from 'knex';

const waitForDbConnection = async (
  knexInstance: Knex,
  retries = 10,
  delay = 3000,
): Promise<void> => {
  for (let i = 0; i < retries; i++) {
    try {
      await knexInstance.raw('select 1+1 as result');
      console.log('✅ Database is up');
      return;
    } catch (err) {
      console.log(`Waiting for DB... attempt ${i + 1}/${retries}`);
      console.log('An error has occured', err);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  console.error('❌ Could not connect to the database');
  process.exit(1);
};

export default waitForDbConnection;
