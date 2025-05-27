import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import IExperience from "@/lib/db/models/Experience";

export async function GET() {
  await connectDB();
  const experience = [
    { code: 0, name: "< 1 năm" },
    { code: 1, name: "1 năm" },
    { code: 2, name: "2 năm" },
    { code: 3, name: "3 năm" },
    { code: 4, name: "> 3 năm" },
  ];

  await IExperience.deleteMany({});
  await IExperience.insertMany(experience);

  return NextResponse.json({ message: "Experience seeded successfully" });
}
