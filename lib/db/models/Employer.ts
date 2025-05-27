import mongoose, { Schema } from "mongoose";
import { IEmployer } from "@/types/employer";

export interface IEmployerDocument extends IEmployer, Document {}

const EmployerSchema = new Schema<IEmployerDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    company_name: { type: String, required: true },
    province: { type: String },
    district: { type: String },
    company_website: { type: String },
    company_logo: { type: String },
    description: { type: String },
    number_phone: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved"], default: "pending" },
  },
  { timestamps: true }
);

const Employer =
  mongoose.models.Employer ||
  mongoose.model<IEmployerDocument>("Employer", EmployerSchema);

export default Employer;
