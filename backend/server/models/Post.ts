import { Model } from 'objection';

export default class Post extends Model {
  static tableName = 'posts';

  static jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 3 },
      createdAt: { type: 'string', format: 'date-time' },
    },
  };
}
