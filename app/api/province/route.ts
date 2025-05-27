import Province from "@/lib/db/models/Province";
import connectDB from "@/lib/db/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const province = await Province.find().lean();
  return NextResponse.json(province);
}
