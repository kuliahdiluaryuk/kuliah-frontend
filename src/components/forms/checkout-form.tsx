"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
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
import useCheckout from "@/hooks/use-checkout";
import useCoupon from "@/hooks/use-coupon";
import { getToken } from "@/lib/cookies";
import { checkoutPayload, checkoutSchema } from "@/lib/validators/checkout";
import { User } from "@/types";

interface CheckoutFormProps {
  user: User;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const router = useRouter();
  const { planId, planCycle } = useCheckout();
  const { couponValue } = useCoupon();

  const form = useForm<checkoutPayload>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      phone: user.phone,
    },
  });

  const onCheckout = async (values: checkoutPayload) => {
    try {
      setIsLoading(true);
      const token = getToken();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/transaction`,
        {
          plan_id: planId,
          plan_cycle: planCycle,
          coupon_code: couponValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.data.data.payment_url) {
        window.location.href = "/";
      } else {
        window.open(response.data.data.payment_url, "_blank");
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-5"
        onSubmit={form.handleSubmit(onCheckout)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your phone number"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-3 sm:mt-[50px]">
          <Button
            variant="outline"
            className="w-full sm:w-fit font-semibold"
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            Cancel
          </Button>
          <Button
            className="w-full sm:w-fit font-semibold"
            type="submit"
            disabled={isLoading}
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
