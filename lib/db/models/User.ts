import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "@/types/user";

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema<IUserDocument>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    nickname: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, requiredPaths: true },
    image: String,
    role: { type: String, enum: ["user", "employer"], default: "user" },
  },
  { timestamps: true }
);

const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);

export default User;
