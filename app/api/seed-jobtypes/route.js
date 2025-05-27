import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import JobType from "@/lib/db/models/Jobtype";

export async function GET() {
  await connectDB();
  const jobTypes = [
    { code: 0, name: "Full Time" },
    { code: 1, name: "Part Time" },
    { code: 2, name: "Internship" },
    { code: 3, name: "Freelance" },
    { code: 4, name: "Remote" },
  ];

  await JobType.deleteMany({});
  await JobType.insertMany(jobTypes);

  return NextResponse.json({ message: "Job types seeded successfully" });
}
