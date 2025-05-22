import Link from "next/link";
import React from "react";
import { ROUTES } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import { IoMdHome, IoMdSearch } from "react-icons/io";

export default function NavbarSignup() {
  return (
    <nav className="sticky top-0 flex items-center w-full py-2 bg-white ">
      <div className=" lg:px-40 sm:px-20 flex w-full items-center space-x-2">
        <div className="flex items-center">
          <Link
            href={ROUTES.homePage}
            className="text-2xl font-bold text-primary font-mono tracking-wider"
          >
            FindJob
          </Link>
        </div>

        <div className="md:flex space-x-1 hidden pr-2 border-r-1 border-gray-300">
          <Input
            className="w-[165px] h-[30px] bg-slate-100 border-none rounded-none"
            placeholder="Title, skill or company"
          />
          <Input
            className="w-[160px] h-[30px] bg-slate-100 border-none rounded-none"
            placeholder="City,state or zip code"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-[70px] flex justify-center">
            <Link
              href={ROUTES.homePage}
              className="flex flex-col items-center active:border-b-2 focus:border-b-2 min-w-full text-gray-500 hover:text-black"
            >
              <IoMdHome size={22} />
              <span className="text-xs font-medium">Home</span>
            </Link>
          </div>

          <div className="w-[70px] flex justify-center">
            <Link
              href={ROUTES.homePage}
              className="flex flex-col items-center active:border-b-2 focus:border-b-2 min-w-full text-gray-500 hover:text-black"
            >
              <IoMdHome size={22} />
              <span className="text-xs font-medium">Jobs</span>
            </Link>
          </div>

          <div className="w-[70px] flex justify-center">
            <Link
              href={ROUTES.homePage}
              className="flex flex-col items-center active:border-b-2 focus:border-b-2 min-w-full text-gray-500 hover:text-black"
            >
              <IoMdHome size={22} />
              <span className="text-xs font-medium">Notofication</span>
            </Link>
          </div>

          <div className="w-[70px] flex justify-center">
            <Link
              href={ROUTES.homePage}
              className="flex flex-col items-center active:border-b-2 focus:border-b-2 min-w-full text-gray-500 hover:text-black"
            >
              <IoMdHome size={22} />
              <span className="text-xs font-medium">Me</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
