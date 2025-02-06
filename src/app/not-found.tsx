import { Footer } from "@/components/layouts/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen flex flex-col justify-center items-center px-4 md:px-0">
      <div className="-mt-[200px] sm:-mt-[250px] -ml-[200px]">
        <Image
          priority
          src="/svg/sign-in-bg.svg"
          alt="logo"
          width={700}
          height={700}
        />
      </div>
      <div className="w-full sm:w-[400px] z-10 -mt-[200px] sm:-mt-[250px] mb-8">
        <Image
          priority
          src="/svg/not-found.svg"
          alt="logo"
          width={700}
          height={700}
        />
      </div>
      <Footer />
    </main>
  );
}
export default NotFound;
