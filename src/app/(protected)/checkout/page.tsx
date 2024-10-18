"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { CheckoutForm } from "@/components/forms/checkout-form";
import { OrderSummary } from "@/components/forms/order-summary";
import { MainNav } from "@/components/layouts/main-nav";
import { Separator } from "@/components/ui/separator";
import { getUserLogged } from "@/lib/utils";
import { User } from "@/types";

function CheckoutPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await getUserLogged();
      setUser(res);
    };

    getUser();
  }, []);

  return (
    <>
      <MainNav />
      <main className="bg-[#F5F5F5] grid grid-cols-1 lg:grid-cols-3 gap-[32px] justify-center p-4 md:py-[64px] md:px-[73px] min-h-[90vh]">
        <div className="lg:col-span-2 w-full rounded-[6px] bg-white border-2 border-[#F0F1F2] py-[32px] p-4 sm:px-[64px]">
          <div>
            <h1 className="font-semibold text-2xl text-neutral-800">
              Checkout Billing
            </h1>
            <p className="text-sm text-neutral-500">
              Fill in your plan & pricing details and address.
            </p>
          </div>
          <Separator className="mt-[20px] mb-[24px]" />
          {user ? (
            <CheckoutForm user={user} />
          ) : (
            <div className="flex items-center justify-center">
              <LoaderCircle className="animate-spin text-[#FFD013]" />
            </div>
          )}
        </div>
        <OrderSummary />
      </main>
    </>
  );
}

export default CheckoutPage;
