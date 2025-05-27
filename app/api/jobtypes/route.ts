import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import JobType from "@/lib/db/models/Jobtype";

export async function GET() {
  await connectDB();
  const jobTypes = await JobType.find().lean();
  return NextResponse.json(jobTypes);
}
