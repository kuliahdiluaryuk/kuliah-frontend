"use client";

import { getUserLogged } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserLogged();
      if (!user) {
        router.push("/english-conversation");
      }
    };

    getUser();
  }, []);

  return <>{children}</>;
}
