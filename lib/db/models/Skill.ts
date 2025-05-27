import mongoose, { Schema, Model } from "mongoose";
import { ISkill } from "@/types/skill";

export interface ISkillDocument extends ISkill, Document {}

const SkillSchema: Schema = new Schema<ISkillDocument>(
  {
    code: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Skill: Model<ISkillDocument> =
  mongoose.models.Skill || mongoose.model<ISkillDocument>("Skill", SkillSchema);
export default Skill;
