import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { IoMdHome, IoMdNotifications } from "react-icons/io";
import { IoBagRemoveSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { getAuthenticatedUser } from "@/lib/auth";
import Logout from "@/components/Logout";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function NavbarDesktop() {
  const user = await getAuthenticatedUser();

  return (
    <div className=" hidden md:flex items-center space-x-4">
      {user ? (
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
              <IoBagRemoveSharp size={22} />
              <span className="text-xs font-medium">Jobs</span>
            </Link>
          </div>

          <div className="w-[70px] flex justify-center">
            <Link
              href={ROUTES.homePage}
              className="flex flex-col items-center active:border-b-2 focus:border-b-2 min-w-full text-gray-500 hover:text-black"
            >
              <IoMdNotifications size={22} />
              <span className="text-xs font-medium">Notification</span>
            </Link>
          </div>
          <div className="w-[70px] flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-xs font-medium flex flex-col"
                >
                  <Image
                    src={user.image || "/avatar-default.jpg"}
                    alt="User Avatar"
                    width={22}
                    height={22}
                    className="rounded-full mr-2"
                  />
                  {user.nickname}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-white">
                <DropdownMenuItem>
                  <Link href="/signup/employer" className="text-wrap">
                    Đăng ký nhà tuyển dụng
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-400" />
                <DropdownMenuItem>
                  <Logout />
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <Button
            className=" bg-blue-600 text-white text-xl hover:bg-blue-700"
            variant="default"
            asChild
          >
            <Link href="/signin">sign in</Link>
          </Button>
          <Button
            className="text-xl border-0 hover:shadow-xs"
            variant="outline"
            asChild
          >
            <Link href="/signup">sign up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
