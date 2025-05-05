import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('posts').del();

  await knex('posts').insert([
    {
      id: 1,
      title: 'My first post',
      content: 'Hello, world!',
    },
    {
      id: 2,
      title: 'My second post',
      content: 'Hello again, world!',
    },
    {
      id: 3,
      title: 'Long post',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Proin dapibus magna non nisi vehicula, nec efficitur lorem varius. 
        Donec nec tincidunt risus, sed pharetra quam. 
        Suspendisse potenti. Pellentesque eu turpis nec nisl dignissim dapibus. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
        Integer ac pretium lectus. Duis iaculis dolor in nulla congue bibendum. 
        Nullam id odio non elit lobortis malesuada. Fusce sed facilisis leo.`,
    },
  ]);
}
