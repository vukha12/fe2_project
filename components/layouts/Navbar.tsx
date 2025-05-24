import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import NavbarDesktop from "@/components/NavbarDesktop";
import { Input } from "@/components/ui/input";

export default async function Navbar() {
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

          <NavbarDesktop />
        </div>
      </div>
    </nav>
  );
}
