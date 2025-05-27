import connectDB from "@/lib/db/mongoose";
import Job from "@/lib/db/models/Job";
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(req: Request) {
  await connectDB();

  const user = await getAuthenticatedUser();

  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const {
      job_title,
      company,
      province,
      district,
      job_type,
      skill,
      experience,
      salary,
      description,
      interest,
    } = await req.json();

    const newJob = await Job.create({
      employer_id: user._id,
      job_title,
      company,
      province: Number(province),
      district: Number(district),
      job_type: Number(job_type),
      skill: Number(skill),
      experience: Number(experience),
      salary,
      description,
      interest,
    });

    return NextResponse.json(
      {
        message: "Job created successfully",
        job: newJob,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
