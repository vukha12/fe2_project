import Job from "@/lib/db/models/Job";
import connectDB from "@/lib/db/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
