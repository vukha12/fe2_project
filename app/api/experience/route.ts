import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Experience from "@/lib/db/models/Experience";

export async function GET() {
  await connectDB();
  const experience = await Experience.find().lean();
  return NextResponse.json(experience);
}
