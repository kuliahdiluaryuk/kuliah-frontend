"use client";

import { EnglishConversationDesktopNav } from "@/components/layouts/english-conversation-desktop-nav";
import { EnglishConversationMobileNav } from "@/components/layouts/english-conversation-mobile-nav";
import useSession from "@/hooks/use-session";
import { getUserLogged } from "@/lib/utils";
import { useEffect } from "react";

export const EnglishConversationNav = () => {
  const { user, setUser } = useSession();

  useEffect(() => {
    const getUser = async () => {
      const res = await getUserLogged();
      setUser(res);
    };
    getUser();
  }, []);

  return (
    <header className="sticky flex items-center h-[10vh] top-0 z-50 w-full border-b bg-white py-3 shadow-sm">
      <nav className="px-4 lg:px-6 w-full">
        <EnglishConversationDesktopNav user={user} />
        <EnglishConversationMobileNav user={user} />
      </nav>
    </header>
  );
};
