"use client";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { loginGoogle } from "@/lib/utils";

const OAuthSignIn = () => {
  const { toast } = useToast();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          },
        );

        await loginGoogle({
          email: res.data.email,
          name: res.data.name,
          avatar: res.data.picture,
        });

        window.location.assign("/");
        toast({
          variant: "yellow",
          title: "Login success",
        });
      } catch (error) {
        console.log(error);
        return toast({
          variant: "destructive",
          title: "Something went wrong",
        });
      }
    },
  });

  return (
    <Button
      onClick={() => loginWithGoogle()}
      aria-label="Sign in with google"
      variant="outline"
      className="w-full bg-background"
    >
      <Icons.google className="mr-2 h-4 w-4" aria-hidden="true" />
      Continue with Google
    </Button>
  );
};

export default OAuthSignIn;
