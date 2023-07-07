import { Schema, type Document, type Model, model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  authentication: {
    salt: string;
    password: string;
  };
}

const UserSchema = new Schema(
  {
    username: { type: String, require: true, unique: true },
    authentication: {
      salt: { type: String, select: false },
      password: { type: String, select: false },
    },
  },
  { timestamps: true }
);

export const User = model<IUser, Model<IUser>>('User', UserSchema);
