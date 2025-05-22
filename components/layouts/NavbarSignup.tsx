import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ROUTES } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";

export default function NavbarSignup() {
  return (
    <nav className="sticky top-0 flex items-center w-full py-4 bg-white rounded flex-col justify-start">
      <div className=" lg:px-30 md:px-10 flex lg:justify-between w-full items-center justify-between space-x-2">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-primary font-mono tracking-wider"
          >
            FindJob
          </Link>
        </div>

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

        <div className="flex gap-4">
          <Button
            className=" bg-blue-600 text-white text-xl hover:bg-blue-700"
            variant="default"
            asChild
          >
            <Link href={ROUTES.signIn}>sign in</Link>
          </Button>
          <Button
            className="text-xl border-0 hover:shadow-xs"
            variant="outline"
            asChild
          >
            <Link href={ROUTES.signUp}>sign up</Link>
          </Button>
        </div>
      </div>
      <div className="flex space-x-1 md:hidden mt-2 justify-start">
        <Input
          className="w-[300px]  bg-slate-100 border-none rounded-none "
          placeholder="Search"
        />
        <Input
          className="w-[300px]  bg-slate-100 border-none rounded-none"
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
    </nav>
  );
}
