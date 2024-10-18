"use client";

import { LogOut, Menu, MessageSquare, Mic, PanelLeft, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
import { PiArrowSquareOut, PiClockClockwise } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useSession from "@/hooks/use-session";
import { cn, getAllConversation, logout } from "@/lib/utils";
import { LuUsers } from "react-icons/lu";
import { TbUserSquare } from "react-icons/tb";

export const EnglishConversationMobileNav = () => {
  const [results, setResults] = useState<any[]>([]);

  const { user } = useSession();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const getAll = async () => {
      const conversation = await getAllConversation();
      if (conversation.length > 0) {
        setResults(conversation);
      }
    };

    if (user) {
      getAll();
    }
  }, [user]);

  const segment = useSelectedLayoutSegment();

  return (
    <div className="flex xl:hidden items-center justify-between">
      {user ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <PanelLeft />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <aside className="flex flex-col space-y-5 pt-[20px] bg-white">
              <nav className="h-full flex flex-col justify-between">
                <div>
                  <div>
                    <SheetClose asChild>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full text-[#737373] flex items-center justify-between"
                      >
                        <Link href="/english-conversation">
                          Start Conversation <Mic className="w-4 h-4" />
                        </Link>
                      </Button>
                    </SheetClose>
                  </div>
                  <ScrollArea className="mt-[28px] h-[60vh]">
                    <div className="space-y-[28px]">
                      <div>
                        {results.length > 0 ? (
                          <>
                            <p className="text-[#404040] font-semibold text-sm">
                              Today
                            </p>
                            <ul className="mt-[14px] space-y-[4px]">
                              {results.map((result, index) => (
                                <li key={index}>
                                  <SheetClose asChild>
                                    <Button
                                      onClick={() =>
                                        router.replace(
                                          `/english-conversation/c/${result.id}`,
                                        )
                                      }
                                      variant="ghost"
                                      className={cn(
                                        "justify-start w-full",
                                        params.conversationId == result.id
                                          ? "text-[#171717]"
                                          : "text-[#737373]",
                                      )}
                                    >
                                      <>
                                        <span>
                                          <MessageSquare className="w-4 h-4 mr-2" />
                                        </span>
                                        <span className="truncate">
                                          How to get started studying abroad for
                                          the orientation program for
                                          international students.
                                        </span>
                                      </>
                                    </Button>
                                  </SheetClose>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </ScrollArea>
                </div>

                <Separator className="my-4" />

                <div className="space-y-[12px] mt-[24px]">
                  <Button
                    variant="ghost"
                    className="justify-start w-full text-[#737373] font-semibold"
                  >
                    <PiArrowSquareOut className="w-5 h-5 mr-2" />
                    Update & FAQ
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start w-full text-[#737373] font-semibold"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Clear Conversations
                  </Button>
                </div>
              </nav>
            </aside>
          </SheetContent>
        </Sheet>
      ) : (
        <Button asChild className="font-semibold">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      )}
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
                    segment === "discover-your-major" ? "default" : "ghost"
                  }
                  className={cn(
                    "justify-start font-semibold shadow-none w-full",
                    segment === "discover-your-major"
                      ? "text-[#292929]"
                      : "text-[#A3A3A3]",
                  )}
                  asChild
                >
                  <Link href="/discover-your-major">Discovery your major</Link>
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
                      : "text-[#A3A3A3]",
                  )}
                  asChild
                >
                  <Link href="/english-conversation">English Conversation</Link>
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
                      : "text-[#A3A3A3]",
                  )}
                  asChild
                >
                  <Link href="/booking-meeting-with-us">
                    Booking Meeting with us
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
                        : "text-[#A3A3A3]",
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
                        : "text-[#A3A3A3]",
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
              <li className="w-full">
                <SheetClose asChild>
                  <Button
                    asChild
                    variant={segment === "referral" ? "default" : "ghost"}
                    className={cn(
                      "justify-start font-semibold shadow-none w-full",
                      segment === "referral"
                        ? "text-[#292929]"
                        : "text-[#A3A3A3]",
                    )}
                  >
                    <Link href="/referral">
                      <LuUsers className="mr-2 h-6 w-6" aria-hidden="true" />
                      Referral Program
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
