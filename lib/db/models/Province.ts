import mongoose, { Schema, Model } from "mongoose";
import { IProvince } from "@/types/province";

export interface IProvinceDocument extends IProvince, Document {}

const ProvinceSchme: Schema = new Schema<IProvinceDocument>(
  {
    code: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Province: Model<IProvinceDocument> =
  mongoose.models.Province ||
  mongoose.model<IProvinceDocument>("Province", ProvinceSchme);
export default Province;
