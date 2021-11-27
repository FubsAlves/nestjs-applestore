import { Document } from 'mongoose';

export interface AuthUser extends Document {
  _id?: string;
  email?: string;
  username?: string;
  password?: string;
  firstName?: string;
  surname?: string;
}
