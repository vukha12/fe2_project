"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/lib/db/models/User";
import connectDB from "@/lib/db/mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "your_very_strong_jwt_secret";

interface JwtPayLoad {
  id: string;
}

export async function getAuthenticatedUser() {
  await connectDB();

  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayLoad;

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return null;

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error authenticating user:", error);

    // Có thể là token hết hạn hoặc không hợp lệ, xóa token để người dùng đăng nhập lại
    (await cookies()).delete("token");
    return null;
  }
}
