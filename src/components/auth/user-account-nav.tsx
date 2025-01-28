"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { PiClockClockwise } from "react-icons/pi";
import { TbUserSquare } from "react-icons/tb";

import UserAvatar from "@/components/auth/user-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, logout } from "@/lib/utils";
import { User } from "@/types";

const UserAccountNav = ({ user }: { user?: User }) => {
  const segment = useSelectedLayoutSegment();

  if (!user) {
    return (
      <Button asChild className="font-semibold">
        <Link href="/sign-in">Sign in</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none flex items-center gap-3 text-start">
        <div>
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white w-[400px] px-[24px] py-[16px]"
        align="end"
      >
        <DropdownMenuLabel className="text-2xl font-semibold">
          Profile & Settings
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="mx-2" />

        <DropdownMenuGroup className="my-4 space-y-4">
          <DropdownMenuItem asChild>
            <Button
              asChild
              variant={segment === "profile" ? "default" : "ghost"}
              className={cn(
                "justify-start cursor-pointer py-6 px-4 outline-none",
                segment === "profile"
                  ? "focus:bg-[#FFD013]/90 font-semibold"
                  : "text-[#737373]",
              )}
            >
              <Link href="/profile">
                <TbUserSquare className="mr-2 h-6 w-6" aria-hidden="true" />
                My Profile
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              asChild
              variant={segment === "subscriptions" ? "default" : "ghost"}
              className={cn(
                "justify-start cursor-pointer py-6 px-4 outline-none",
                segment === "subscriptions"
                  ? "focus:bg-[#FFD013]/90 font-semibold"
                  : "text-[#737373]",
              )}
            >
              <Link href="/subscriptions">
                <PiClockClockwise className="mr-2 h-6 w-6" aria-hidden="true" />
                Subscriptions
              </Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mx-2 mb-4" />

        <DropdownMenuItem asChild>
          <Button
            onClick={logout}
            variant="ghost"
            className="text-[#737373] justify-start cursor-pointer font-medium py-6 px-4 outline-none w-full"
          >
            <LogOut className="mr-2 h-6 w-6" aria-hidden="true" />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
