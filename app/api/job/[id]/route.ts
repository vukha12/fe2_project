import Job from "@/lib/db/models/Job";
import connectDB from "@/lib/db/mongoose";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const job = await Job.findById(params.id);
    if (!job)
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    return NextResponse.json(job);
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
