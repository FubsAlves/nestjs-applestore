import { Document } from 'mongoose';

export interface AuthUser extends Document {
  email: string;
  password: string;
}
