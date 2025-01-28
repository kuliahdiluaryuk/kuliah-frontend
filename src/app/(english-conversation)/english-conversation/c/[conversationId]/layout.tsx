"use client";

import useSession from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/english-conversation");
    }
  }, []);

  return <>{children}</>;
}
