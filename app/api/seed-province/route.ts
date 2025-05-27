import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Province from "@/lib/db/models/Province";

export async function GET() {
  await connectDB();
  const province = [
    { code: 79, name: "Hồ Chí Minh" },
    { code: 1, name: "Hà nội" },
  ];

  await Province.deleteMany({});
  await Province.insertMany(province);

  return NextResponse.json({ message: "Job types seeded successfully" });
}
