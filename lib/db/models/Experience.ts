import { IExperience } from "@/types/experience";
import mongoose, { Schema, Model } from "mongoose";

export interface IIExperienceDocument extends IExperience, Document {}

const IExperienceSchema: Schema = new Schema<IIExperienceDocument>(
  {
    code: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Experience: Model<IIExperienceDocument> =
  mongoose.models.Experience ||
  mongoose.model<IIExperienceDocument>("Experience", IExperienceSchema);

export default Experience;
