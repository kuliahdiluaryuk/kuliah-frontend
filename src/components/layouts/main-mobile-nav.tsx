"use client";

import { LogOut, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { LuUsers } from "react-icons/lu";
import { PiClockClockwise } from "react-icons/pi";
import { TbUserSquare } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn, logout } from "@/lib/utils";
import { User } from "@/types";

export const MainMobileNav = ({ user }: { user?: User }) => {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="flex xl:hidden items-center justify-between">
      <Link href="/">
        <Image src="/svg/logo.svg" width={44} height={44} alt="logo" />
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="flex items-center justify-start gap-2">
            <Image src="/svg/logo.svg" width={44} height={44} alt="logo" />
            <SheetTitle className="text-lg font-semibold">
              Kuliah Di Luar Yuk
            </SheetTitle>
          </div>
          <Separator className="my-4" />
          <ul className="flex flex-col items-center justify-center gap-4">
            <li className="w-full">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="justify-start font-semibold shadow-none w-full text-[#A3A3A3]"
                  asChild
                >
                  <Link href="/">Home</Link>
                </Button>
              </SheetClose>
            </li>
            <li className="w-full">
              <SheetClose asChild>
                <Button
                  variant={
                    segment === "english-conversation" ? "default" : "ghost"
                  }
                  className={cn(
                    "justify-start font-semibold shadow-none w-full",
                    segment === "english-conversation"
                      ? "text-[#292929]"
                      : "text-[#A3A3A3]"
                  )}
                  asChild
                >
                  <Link href="/english-conversation">
                  Prepare Your English
                  </Link>
                </Button>
              </SheetClose>
            </li>
            <li className="w-full">
              <SheetClose asChild>
                <Button
                  variant={
                    segment === "discover-your-major" ? "default" : "ghost"
                  }
                  className={cn(
                    "justify-start font-semibold shadow-none w-full",
                    segment === "discover-your-major"
                      ? "text-[#292929]"
                      : "text-[#A3A3A3]"
                  )}
                  asChild
                >
                  <Link href="/discover-your-major">Discover Your Major</Link>
                </Button>
              </SheetClose>
            </li>
            <li className="w-full">
              <SheetClose asChild>
                <Button
                  variant={
                    segment === "booking-meeting-with-us" ? "default" : "ghost"
                  }
                  className={cn(
                    "justify-start font-semibold shadow-none w-full",
                    segment === "booking-meeting-with-us"
                      ? "text-[#292929]"
                      : "text-[#A3A3A3]"
                  )}
                  asChild
                >
                  <Link href="/booking-meeting-with-us">
                    Discuss Your Study Plan with us
                  </Link>
                </Button>
              </SheetClose>
            </li>
          </ul>
          {user ? (
            <ul className="flex flex-col justify-center gap-4">
              <p className="text-lg font-semibold mt-8">Profile & Settings</p>
              <Separator />
              <li className="w-full">
                <SheetClose asChild>
                  <Button
                    asChild
                    variant={segment === "profile" ? "default" : "ghost"}
                    className={cn(
                      "justify-start font-semibold shadow-none w-full",
                      segment === "profile"
                        ? "text-[#292929]"
                        : "text-[#A3A3A3]"
                    )}
                  >
                    <Link href="/profile">
                      <TbUserSquare
                        className="mr-2 h-6 w-6"
                        aria-hidden="true"
                      />
                      My Profile
                    </Link>
                  </Button>
                </SheetClose>
              </li>
              <li className="w-full">
                <SheetClose asChild>
                  <Button
                    asChild
                    variant={segment === "subscriptions" ? "default" : "ghost"}
                    className={cn(
                      "justify-start font-semibold shadow-none w-full",
                      segment === "subscriptions"
                        ? "text-[#292929]"
                        : "text-[#A3A3A3]"
                    )}
                  >
                    <Link href="/subscriptions">
                      <PiClockClockwise
                        className="mr-2 h-6 w-6"
                        aria-hidden="true"
                      />
                      Subscriptions
                    </Link>
                  </Button>
                </SheetClose>
              </li>
              <Separator />
              <li className="w-full">
                <SheetClose asChild>
                  <Button
                    onClick={logout}
                    variant="ghost"
                    className="justify-start font-semibold shadow-none w-full text-[#A3A3A3]"
                  >
                    <LogOut className="mr-2 h-6 w-6" aria-hidden="true" />
                    Log out
                  </Button>
                </SheetClose>
              </li>
            </ul>
          ) : (
            <div className="space-y-8 mt-8 flex flex-col items-center justify-center">
              <Separator />
              <Button asChild className="font-semibold">
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
