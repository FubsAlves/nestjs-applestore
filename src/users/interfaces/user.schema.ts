import * as mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  complement: { type: String, required: false },
  postalCode: { type: String, Required: true },
  district: { type: String, Required: true },
  city: { type: String, Required: true },
  state: { type: String, required: true },
});

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  avatarUrl: { type: String, required: false },
  identification: { type: String, required: true },
  userAddress: { type: AddressSchema, required: true },
});
