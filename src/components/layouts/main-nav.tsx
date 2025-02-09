"use client";

import { MainDesktopNav } from "@/components/layouts/main-desktop-nav";
import { MainMobileNav } from "@/components/layouts/main-mobile-nav";
import useSession from "@/hooks/use-session";
import { getUserLogged } from "@/lib/utils";
import { useEffect } from "react";

export const MainNav = () => {
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
      <nav className="px-4 md:px-[32px] w-full">
        <MainDesktopNav user={user} />
        <MainMobileNav user={user} />
      </nav>
    </header>
  );
};
