import { Schema, type Document, type Model, model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true, select: false },
});

export const User = model<IUser, Model<IUser>>('User', UserSchema);
