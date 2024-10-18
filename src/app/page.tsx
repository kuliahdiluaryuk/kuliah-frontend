import { Icons } from "@/components/icons";
import { Footer } from "@/components/layouts/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import { RiHome6Line, RiUserVoiceLine } from "react-icons/ri";

export default function Home() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[95vw] sm:w-[360px] my-4 sm:my-0">
        <div className="flex flex-col items-center justify-center gap-5 sm:gap-[26px] mb-10">
          <Image src="/svg/logo.svg" width={76} height={76} alt="logo" />
          <h1 className="text-3xl font-semibold">Kuliah Di Luar Yuk</h1>
        </div>
        <h2 className="text-2xl font-medium">Menu</h2>
        <Separator className="mt-[20px] mb-[32px]" />
        <div className="space-y-[14px] w-full md:w-auto px-4 md:px-0">
          <Button className="w-full h-14 text-md font-semibold" asChild>
            <Link href="/">
              <RiHome6Line className="w-5 h-5 mr-2" /> Home
            </Link>
          </Button>
          <Button
            className="w-full h-14 text-md font-medium text-muted-foreground"
            variant="outline"
            asChild
          >
            <Link href="/discover-your-major">
              <MessagesSquare className="w-5 h-5 mr-2" /> Discover you Major in
              60 Seconds
            </Link>
          </Button>
          <Button
            className="w-full h-14 text-md font-medium text-muted-foreground"
            variant="outline"
            asChild
          >
            <Link href="/english-conversation">
              <RiUserVoiceLine className="w-5 h-5 mr-2" /> Find Out Your
              Conversation Level
            </Link>
          </Button>
          <Button
            className="w-full h-14 text-md font-medium text-muted-foreground"
            variant="outline"
            asChild
          >
            <Link href="/booking-meeting-with-us">
              <CiCalendar className="w-5 h-5 mr-2" /> Discuss Your Plan with us
            </Link>
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          “Unlocking potential, One person at a time”
        </p>
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
