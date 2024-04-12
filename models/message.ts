import { read } from 'fs';
import { Schema, model, models, Document } from 'mongoose';
import Property from './Property';
import User from './User';

interface Message extends Document {
  _id: string;
  sender: string | User;
  recipient: string | User;
  property: string | Property;
  name: string;
  email: string;
  phone: string;
  body: string;
  read: boolean;
  createdAt: string | Date;
}

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = models.Message || model('Message', MessageSchema);

export default Message;
