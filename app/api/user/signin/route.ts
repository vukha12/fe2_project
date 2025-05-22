import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import User from "@/lib/db/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email không tồn tài" },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Sai mật khẩu" }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Đăng nhập thành công", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
