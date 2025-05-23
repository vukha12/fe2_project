import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "@/types/user";

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema<IUserDocument>(
  {
    sub: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: String,
    email_verified: Boolean,
    pictute: String,
    role: { type: String, enum: ["user", "employer"], default: "user" },
  },
  { timestamps: true }
);

const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);

export default User;
