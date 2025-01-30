"use client"

import { Icons } from "@/components/icons";
import { Footer } from "@/components/layouts/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useSession from "@/hooks/use-session";
import { getUserLogged } from "@/lib/utils";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { RiHome6Line } from "react-icons/ri";


export default function Home() {
  const { user, setUser } = useSession();

  useEffect(() => {
    const getUser = async () => {
      const res = await getUserLogged();
      setUser(res);
    };
    getUser();
  }, []);

  return (
    <main className="bg-[#FAFAFA] min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[95vw] sm:w-[560px] my-4 sm:my-0">
        <div className="flex flex-col items-center justify-center gap-5 sm:gap-[20px] mb-10">
          <Image src="/svg/logo.svg" width={76} height={76} alt="logo" />
          <h1 className="text-3xl font-semibold">Kuliah Di Luar Yuk</h1>
          <p className="text-center">
            Unlock Your Future Abroad: Plan Your Studies, Master Your English!
          </p>
        </div>
        <h2 className="text-2xl font-medium">Menu</h2>
        <Separator className="mt-[20px] mb-[32px]" />
        <div className="w-full md:w-auto px-4 md:px-0 flex flex-col md:flex-row gap-4 justify-center">
          {/* Primary Button */}
          <Button
            className="w-[360px] h-52 text-lg font-bold bg-gradient-to-r transform hover:scale-105 transition-all duration-300 rounded-lg"
            asChild
          >
            <Link href="/discover-your-major">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <RiHome6Line className="w-6 h-6" />
                  <span className="text-lg font-bold">Plan Your Study</span>
                </div>
                <small className="text-sm font-normal mt-2 ">
                  Your Study-Abroad Journey Starts Here
                </small>
              </div>
            </Link>
          </Button>

          <Button
            className="w-[360px] h-52 text-md font-medium transform hover:scale-105 transition-all duration-300 rounded-lg"
            variant="outline"
            asChild
          >
            <Link href="/english-conversation">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <MessagesSquare className="w-6 h-6" />
                  <span>Prepare Your English</span>
                </div>
                <small className="text-sm font-normal mt-2 ">
                  Practice Speaking, Unlock Your Potential
                </small>
              </div>
            </Link>
          </Button>
        </div>
        { !user && (
          <div className="flex items-center mt-12">
            <p className="text-center text-sm text-muted-foreground">
              Dont Have Account?
            </p>
            <Link href="/sign-up" className="text-center text-sm ms-2 text-yellow-400">Sign up</Link>
            <p className="text-center text-sm text-muted-foreground ms-2">
              Or
            </p>
            <Link href="/sign-in" className="text-center text-sm ms-2 text-yellow-400">Sign in</Link>
          </div>
        )}

        <div className="flex items-center justify-center gap-[14px] mt-[52px]">
          <Link href="/">
            <Icons.facebook />
          </Link>
          <Link href="/">
            <Icons.instagram />
          </Link>
          <Link href="/">
            <Icons.whatsapp />
          </Link>
        </div>
        <Footer />
      </div>
    </main>
  );
}
