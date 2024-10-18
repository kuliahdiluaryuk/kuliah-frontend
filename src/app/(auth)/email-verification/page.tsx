"use client";

import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";


const EmailVerification = () => {
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  const email = Cookies.get("unverified_email"); // Get the email from the cookies

  const handleResend = async () => {
    try {
      setIsResending(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/resend-verification`,
        { email }
      );
      toast({
        variant: "yellow",
        title: "Verification email resent",
        description: `A new verification email has been sent to ${email}.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to resend",
        description: "There was an issue resending the verification email.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="bg-[#FAFAFA] min-h-screen flex flex-col justify-center items-center">
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
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-[#262626]">
              Email Verification Required
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1">
            <Separator className="mb-6" />
            <p className="mb-6">
              Your email <strong>{email}</strong> needs to be verified before
              you can proceed.
            </p>
            <Button onClick={handleResend} disabled={isResending}>
              {isResending ? "Resending..." : "Resend Verification Email"}
            </Button>
          </CardContent>
          {/* <CardFooter className='text-sm text-muted-foreground flex items-center justify-center'>
            <span className='mr-1 inline-block'>
              Don&apos;t have an account?
            </span>
            <Link
              aria-label='Sign up'
              href='/sign-up'
              className='text-[#FFD013]'
            >
              Sign up
            </Link>
          </CardFooter> */}
        </Card>
      </div>
    </main>
  );
};

export default EmailVerification;
