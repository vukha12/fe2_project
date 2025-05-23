"use client";

import Link from "next/link";
import React from "react";
import { ROUTES } from "@/constants/routes";
import NavbarSignin from "@/components/NavbarSignin";
import { Input } from "@/components/ui/input";
import { auth0 } from "@/lib/auth0";
import { Button } from "@/components/ui/button";
import { IoMdSearch } from "react-icons/io";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";

export default async function Navbar() {
  const seesion = await auth0.getSession();
  return (
    <nav className="sticky top-0 w-full py-2 bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href={ROUTES.homePage}
              className="text-2xl font-bold text-primary font-mono tracking-wider"
            >
              JobEvery
            </Link>
          </div>

          {seesion ? (
            <div className="md:flex space-x-1 hidden pr-2 items-center">
              <Input
                className="w-[300px] h-[30px] bg-slate-100 border-none rounded-none"
                placeholder="Title, skill or company"
              />
              <Input
                className="w-[300px] h-[30px] bg-slate-100 border-none rounded-none"
                placeholder="City,state or zip code"
              />
            </div>
          ) : (
            <div className="md:flex space-x-1 hidden">
              <Input
                className="lg:w-[300px] md:w-[200px] bg-slate-100 border-none rounded-none "
                placeholder="Search"
              />
              <Input
                className="lg:w-[300px] md:w-[200px] bg-slate-100 border-none rounded-none"
                placeholder="Location"
              />
              <Button
                type="submit"
                variant="ghost"
                className="cursor-pointer hover:shadow-xs"
              >
                <IoMdSearch size={60} />
              </Button>
            </div>
          )}

          <NavbarSignin />
        </div>
      </div>
    </nav>
  );
}

async function SyncUserOnLogin() {
  const session = await auth0.getSession();

  useEffect(() => {
    // Chỉ chạy khi user đã được tải và không có lỗi, và user đã đăng nhập
    if (session?.user) {
      const syncUser = async () => {
        try {
          console.log("Attempting to sync user with database...");
          const response = await fetch("/api/sync-user"); // Gọi API Route của bạn
          const data = await response.json();

          if (!response.ok) {
            console.error("Failed to sync user:", data.error);
            // Xử lý lỗi nếu cần
          } else {
            console.log("User synced successfully:", data.user);
            // Xử lý thành công, ví dụ: cập nhật state, redirect, v.v.
          }
        } catch (fetchError) {
          console.error("Error during API call to sync user:", fetchError);
        }
      };

      syncUser();
    }
  }, [session?.user]); // Dependencies for useEffect

  // Component này không render gì nhiều, chỉ xử lý logic ngầm
  // Bạn có thể thêm UI loaders hoặc error messages nếu muốn.
  return null;
}
