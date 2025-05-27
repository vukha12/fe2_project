import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Skill from "@/lib/db/models/Skill";

export async function GET() {
  await connectDB();
  const skill = [
    {
      code: 0,
      name: "Java",
    },
    {
      code: 1,
      name: "React",
    },
    {
      code: 2,
      name: "Next",
    },
    {
      code: 3,
      name: "Node",
    },
    {
      code: 4,
      name: "PHP",
    },
    {
      code: 5,
      name: "Laravel",
    },
    {
      code: 6,
      name: "Tailwind CSS",
    },
    {
      code: 7,
      name: "Swift",
    },
    {
      code: 8,
      name: "Kotlin",
    },
    {
      code: 9,
      name: "TypeScript",
    },
    {
      code: 10,
      name: "MongoDB",
    },
    {
      code: 11,
      name: "Sqlite",
    },
    {
      code: 12,
      name: "PostgreSQL",
    },
  ];

  await Skill.deleteMany({});
  await Skill.insertMany(skill);

  return NextResponse.json({ message: "Skill seeded successfully" });
}
