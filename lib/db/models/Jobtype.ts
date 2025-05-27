import { IJobtypes } from "@/types/jobtypes";
import mongoose, { Schema, Model } from "mongoose";

export interface IJobtypeDocument extends IJobtypes, Document {}

const JobtypeSchema: Schema = new Schema<IJobtypeDocument>(
  {
    code: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Jobtype: Model<IJobtypeDocument> =
  mongoose.models.Jobtype ||
  mongoose.model<IJobtypeDocument>("Jobtype", JobtypeSchema);

export default Jobtype;
