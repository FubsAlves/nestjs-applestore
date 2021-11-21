import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: 6,
      maxlength: 32,
    },
    firstName: { type: String, required: true, minlength: 3, maxlength: 50 },
    surname: { type: String, required: true, minlength: 3, maxlength: 50 },
    password: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true, maxlength: 254 },
    phoneNumber: { type: String, required: true, unique: true },
    avatarUrl: {
      type: String,
      default:
        'https://robohash.org/b67a27f0c6acffde09999915e31aac7f?set=set4&bgset=&size=200x200',
    },
    identification: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 14,
    },
    street: { type: String, required: true, maxlength: 100 },
    complement: { type: String, required: false, maxlength: 50 },
    postalCode: { type: String, Required: true },
    district: { type: String, Required: true, maxlength: 50 },
    city: { type: String, Required: true, maxlength: 70 },
    state: { type: String, required: true, minlength: 2, maxlength: 2 },
  },
  { timestamps: true, collection: 'users' },
);
