import mongoose from "mongoose";

export interface userAttributes {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  _id: string;
  _doc: { password: string };
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
    timestamps: true,
  }
);

const User = mongoose.model<userAttributes>("User", UserSchema);

export default User;
