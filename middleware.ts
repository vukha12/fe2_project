import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_very_strong_jwt_secret";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (token && (pathname === "/signin" || pathname === "/signup")) {
    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.redirect(new URL("/", req.url));
    } catch (err) {
      console.error("JWT error:", err);
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup"],
};
