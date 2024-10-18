"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { resetPasswordPayload, resetPasswordSchema } from "@/lib/validators/reset-password";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordInput } from "./password-input";

export function ResetPasswordForm() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams(); // Access query parameters
  const token = searchParams.get("token"); // Get the token from the URL
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<resetPasswordPayload>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", password_confirmation: "" },
  });

  const onSubmit = async (data: {
    password: string;
    password_confirmation: string;
  }) => {
    try {
      setIsLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/reset-password`,
        {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        }
      );

      toast({
        title: "Password reset",
        description: "Your password has been reset.",
        variant: "yellow",
      });
      router.push("/reset-password-success");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your new password"
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
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Renter your new password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
}
