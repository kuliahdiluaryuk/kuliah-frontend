"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { PasswordInput } from "@/components/forms/password-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { setToken } from "@/lib/cookies";
import { signinPayload, signinSchema } from "@/lib/validators/sign-in";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const form = useForm<signinPayload>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
      savePassword: false,
    },
  });

  const onSubmit = async (values: signinPayload) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/login`,
        {
          email: values.email,
          password: values.password,
        },
      );

      setToken(response.data.data.token);
      window.location.assign("/");
      toast({
        variant: "yellow",
        title: "Login success",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          Cookies.set('unverified_email', values.email, { expires: 1/24 });
          window.location.assign("/email-verification");
        } else {
          return toast({
            variant: "destructive",
            title: "Failed to login",
            description: error.response?.data.message,
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center gap-4 py-3">
          <FormField
            control={form.control}
            name="savePassword"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-1.5 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-muted-foreground">
                  Save password
                </FormLabel>
              </FormItem>
            )}
          />
          <Link href="/forgot-password" className="text-sm">
            Forgot password?
          </Link>
        </div>
        <Button disabled={isLoading}>
          Continue
          <span className="sr-only">Sign in</span>
        </Button>
      </form>
    </Form>
  );
}
