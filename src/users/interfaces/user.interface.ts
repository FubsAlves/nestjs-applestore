import { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  firstName: string;
  surname: string;
  password?: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string;
  identification: string;
  userAddress: Address;
}

interface Address {
  street: string;
  complement?: string;
  postalCode: string;
  district: string;
  city: string;
  state: string;
}
