import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('posts').del();

  await knex('posts').insert([
    { id: 1, title: 'My first post', content: 'Hello, world!' },
    { id: 2, title: 'My second post', content: 'Hello again, world!'},
    { id: 2, title: 'My second post', content: 'Hello again, world!'},
  ]);
}
