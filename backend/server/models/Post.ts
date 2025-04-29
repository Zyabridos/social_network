import { Model } from 'objection';

export default class Post extends Model {
  static tableName = 'posts';

  static jsonSchema = {
    type: 'object',
    required: ['title', 'content'],
    properties: {
      id: { type: 'integer' },
      title: { type: 'string', minLength: 3 },
      content: { type: 'string', minLength: 3 },
      createdAt: { type: 'string', format: 'date-time' },
    },
  };
}
