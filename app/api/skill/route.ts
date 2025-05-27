import connectDB from "@/lib/db/mongoose";
import Skill from "@/lib/db/models/Skill";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const skills = await Skill.find().lean();
  return NextResponse.json(skills);
}
