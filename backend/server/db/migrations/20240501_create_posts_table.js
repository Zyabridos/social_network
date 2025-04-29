export async function up(knex) {
  await knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('posts');
}
