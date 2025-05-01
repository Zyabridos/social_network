import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // users db delete
  await knex('users').del();

  const hashedPassword = await bcrypt.hash('password123', 10);

  await knex('users').insert([
    { id: 1, email: 'testuser@example.com', password_hash: hashedPassword },
    { id: 2, email: 'admin@example.com', password_hash: hashedPassword },
  ]);
}
