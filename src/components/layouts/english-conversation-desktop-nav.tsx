"use client";

import UserAccountNav from "@/components/auth/user-account-nav";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "@/types";

export const EnglishConversationDesktopNav = ({ user }: { user?: User }) => {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="hidden xl:flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <Image
          className="hidden sm:block"
          src="/svg/logo.svg"
          width={44}
          height={44}
          alt="logo"
        />
        <div>
          <h1 className="text-lg font-semibold">Kuliah Di Luar Yuk</h1>
          <p className="text-xs text-muted-foreground">Conversation.AI</p>
        </div>
      </Link>
      <ul className="flex items-center justify-center gap-2">
        <li>
          <Button
            variant="ghost"
            className="font-semibold shadow-none text-[#A3A3A3]"
            asChild
          >
            <Link href="/">Home</Link>
          </Button>
        </li>
        <li>
          <Button
            variant={segment === "english-conversation" ? "default" : "ghost"}
            className={cn(
              "font-semibold shadow-none",
              segment === "english-conversation"
                ? "text-[#292929]"
                : "text-[#A3A3A3]",
            )}
            asChild
          >
            <Link href="/english-conversation">Interactive Conversation</Link>
          </Button>
        </li>
        <li>
          <Button
            variant={
              segment === "booking-meeting-with-us" ? "default" : "ghost"
            }
            className={cn(
              "font-semibold shadow-none",
              segment === "booking-meeting-with-us"
                ? "text-[#292929]"
                : "text-[#A3A3A3]",
            )}
            asChild
          >
            <Link href="/booking-meeting-with-us">
              Discuss Your English Preparation with Us
            </Link>
          </Button>
        </li>
        <li>
          <Button
            variant={segment === "pricing" ? "default" : "ghost"}
            className={cn(
              "font-semibold shadow-none",
              segment === "pricing" ? "text-[#292929]" : "text-[#A3A3A3]",
            )}
            asChild
          >
            <Link href="/pricing">Subscription</Link>
          </Button>
        </li>
      </ul>

      <UserAccountNav user={user} />
    </div>
  );
};
