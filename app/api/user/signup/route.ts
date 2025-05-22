import connectDB from "@/lib/db/mongoose";
import UserModel from "@/lib/db/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { firstName, lastName, email, password } = await req.json();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email đã tồn tại" },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const createUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await createUser.save();

    return NextResponse.json(
      { message: "Đăng ký thành công" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
