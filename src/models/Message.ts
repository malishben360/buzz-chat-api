import { Schema, type Model, type Document, model } from 'mongoose';

export interface IMessage extends Document {
  sender: Schema.Types.ObjectId;
  recipient: Schema.Types.ObjectId;
  text: string;
  file: string | null;
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    recipient: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    text: { type: String, require: true },
    file: { type: String },
  },
  { timestamps: true }
);

export const Message = model<IMessage, Model<IMessage>>(
  'Message',
  MessageSchema
);
