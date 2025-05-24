import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import User from "@/lib/db/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { firstname, lastname, email, password } = await req.json();

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { message: "thông tin không hợp lệ" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({
      firstname,
      lastname,
      nickname: `${firstname}${lastname}`,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User created successfully!",
        user: {
          id: newUser._id,
          email: newUser.email,
          nickname: newUser.nickname,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Đăng nhập thất bại:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
