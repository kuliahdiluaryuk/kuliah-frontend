"use client";

import useSession from "@/hooks/use-session";
import { getUserLogged } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUser } = useSession();

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserLogged();
      if (!user) {
        router.push("/sign-in");
      } else {
        setUser(user);
      }
    };

    getUser();
  }, []);

  return <>{children}</>;
}
