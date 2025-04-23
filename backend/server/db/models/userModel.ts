import { Model } from 'objection';

export default class User extends Model {
  static get tableName() {
    return 'users';
  }

  id!: number;
  email!: string;
  password_hash!: string;
  first_name?: string;
  last_name?: string;
  created_at!: string;
}
