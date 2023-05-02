import { db } from '../database/connection.ts';
import { ObjectId } from '../../deps.ts';

export interface UserSchema {
  _id?: ObjectId;
  name: string;
  email: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const User = db.collection<UserSchema>('user');