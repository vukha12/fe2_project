import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Employer from "@/lib/db/models/Employer";
import { getAuthenticatedUser } from "@/lib/auth";
import { Types } from "mongoose";

export async function POST(req: Request) {
  await connectDB();

  const user = await getAuthenticatedUser();

  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const {
      company_name,
      company_website,
      province,
      district,
      description,
      number_phone,
    } = await req.json();

    const location = {};

    const existingRequest = await Employer.findOne({ userId: user._id });
    if (existingRequest) {
      return NextResponse.json(
        { message: "Đã gửi yêu cầu trước đó rồi" },
        { status: 400 }
      );
    }

    const newEmployer = await Employer.create({
      userId: user._id,
      company_name,
      company_website,
      province,
      district,
      description,
      number_phone,
      status: "pending",
    });

    return NextResponse.json(
      {
        message: "Gửi yêu cầu thành công",
        Employer: {
          name: company_name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lỗi tạo yêu cầu employer:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
