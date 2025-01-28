import { Footer } from "@/components/layouts/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

function VerifiedEmailSuccessPage() {
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
        <Card>
          <CardContent className="grid grid-cols-1 py-4 text-center">
            <svg
              width="62"
              height="62"
              viewBox="0 0 62 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-4"
            >
              <g clip-path="url(#clip0_976_3121)">
                <path
                  d="M31 0C13.8793 0 0 13.8793 0 31C0 48.1217 13.8793 62 31 62C48.1217 62 62 48.1217 62 31C62 13.8793 48.1217 0 31 0ZM31 58.186C16.0435 58.186 3.875 45.9565 3.875 30.9999C3.875 16.0433 16.0435 3.87488 31 3.87488C45.9565 3.87488 58.125 16.0434 58.125 30.9999C58.125 45.9563 45.9565 58.186 31 58.186ZM43.3719 19.6569L25.1836 37.9595L16.9928 29.7687C16.2362 29.0121 15.0098 29.0121 14.2522 29.7687C13.4956 30.5253 13.4956 31.7517 14.2522 32.5083L23.8418 42.099C24.5984 42.8546 25.8249 42.8546 26.5824 42.099C26.6696 42.0118 26.7443 41.9168 26.8121 41.818L46.1135 22.3974C46.8691 21.6408 46.8691 20.4144 46.1135 19.6569C45.3559 18.9003 44.1295 18.9003 43.3719 19.6569Z"
                  fill="#16A34A"
                />
              </g>
              <defs>
                <clipPath id="clip0_976_3121">
                  <rect width="62" height="62" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h1 className="text-2xl">Verified Email</h1>
            <p className="text-muted-foreground">Your email has been successfully verified.</p>
          </CardContent>
          <CardFooter className="text-sm flex items-center justify-center">
            <Link
              aria-label="Sign in"
              className="w-full bg-[#FFD02E] py-2 px-4 text-center rounded-lg"
              href={"/"}
            >
              Login
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </main>
  );
}
export default VerifiedEmailSuccessPage;
