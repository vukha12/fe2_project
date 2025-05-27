import mongoose, { Schema, Model } from "mongoose";
import { IJob } from "@/types/job";

export interface IJobDocument extends IJob, Document {}

const JobSchema: Schema = new Schema<IJobDocument>({
  employer_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  job_title: { type: String, required: true },
  company: { type: String, required: true },
  province: { type: Number, required: true },
  district: { type: Number, required: true },
  job_type: { type: Number, required: true },
  skill: { type: Number, required: true },
  experience: { type: Number, required: true },
  salary: { type: String, required: true },
  description: { type: String, required: true },
  interest: { type: String, required: true },
});

const Job: Model<IJobDocument> =
  mongoose.models.Job || mongoose.model<IJobDocument>("Job", JobSchema);
export default Job;
