import { Schema, model, models, Document } from 'mongoose';

type User = Document & {
  _id: string;
  email: string;
  username: string;
  image: string;
  bookmarks: string[];
};

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model<User>('User', UserSchema);

export default User;
