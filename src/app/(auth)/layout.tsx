"use client";

import { getUserLogged } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserLogged();
      if (user) {
        return router.push("/");
      }
    };

    getUser();
  }, []);

  return <>{children}</>;
}
