import OAuthSignIn from "@/components/auth/oauth-sign-in";
import { SignUpForm } from "@/components/forms/sign-up-form";
import { Footer } from "@/components/layouts/footer";
import { SignUpNav } from "@/components/layouts/sign-up-nav";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

function SignUpPage() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen flex flex-col justify-center items-center">
      {/* <SignUpNav /> */}
      <div className="-mt-[150px] sm:-mt-[250px] -ml-[200px]">
        <Link aria-label="Homepagee" href="/">
          <Image
            priority
            src="/svg/sign-in-bg.svg"
            alt="logo"
            width={700}
            height={700}
          />
        </Link>
      </div>
      <div className="sm:w-[400px] z-10 -mt-[150px] sm:-mt-[250px] mb-8 px-4 md:px-0">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-[#262626]">
              Create an account
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1">
            <Separator className="mb-6" />
            <SignUpForm />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">OR</span>
              </div>
            </div>
            <OAuthSignIn />
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground flex items-center justify-center">
            <span className="mr-1 inline-block">Already have an account?</span>
            <Link
              aria-label="Sign in"
              href="/sign-in"
              className="text-[#FFD013]"
            >
              Log in
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </main>
  );
}
export default SignUpPage;
