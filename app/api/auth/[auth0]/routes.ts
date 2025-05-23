import { auth0 } from "@/lib/auth0";
import connectDB from "@/lib/db/mongoose";
import User from "@/lib/db/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sub, name, email, email_verified, picture } = session.user;

  try {
    await connectDB();

    const user = await User.findOneAndUpdate(
      { sub: sub }, // Điều kiện tìm kiếm
      {
        // Các trường cần cập nhật hoặc tạo mới
        name: name,
        email: email,
        email_verified: email_verified,
        picture: picture,
        lastLoginAt: new Date(), // Thêm trường này để biết lần cuối đăng nhập
        // Bạn có thể thêm createdAt: new Date() ở đây nếu muốn lưu thời điểm tạo ban đầu
        // Nhưng nếu là upsert, createdAt sẽ chỉ được set khi tạo mới
        $setOnInsert: { createdAt: new Date() }, // Chỉ set createdAt khi tạo mới
      },
      {
        new: true, // Trả về tài liệu đã được cập nhật/tạo mới
        upsert: true, // Nếu không tìm thấy, tạo mới
        setDefaultsOnInsert: true, // Đảm bảo các giá trị mặc định được áp dụng khi tạo mới
      }
    );

    console.log(`User ${user.sub} synced with database.`);
    return NextResponse.json({ message: "User synced", user });
  } catch (error) {
    console.error("Error during user sync:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
