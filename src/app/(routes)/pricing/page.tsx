"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import useCheckout from "@/hooks/use-checkout";
import useSession from "@/hooks/use-session";
import { formatPrice } from "@/lib/utils";
import { Plan } from "@/types";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planCycle, setPlanCycle] = useState<"monthly" | "yearly">("monthly");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { user } = useSession();
  const { addPlanId, addPlanCycle } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    const getPlans = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/plan`
        );

        setPlans(response.data.message);
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

    getPlans();
  }, []);

  const onCheckout = async (id: number) => {
    addPlanId(id);
    addPlanCycle(planCycle);
    router.push("/checkout");
  };
  return (
    <div className="mt-5">
      <section>
        <h3 className="text-lg font-semibold text-neutral-800 text-center">
          Plan & Pricing
        </h3>
        <p className="text-neutral-500 text-sm text-center">
          Pick the most suitable plan for you
        </p>
      </section>
      <section className="flex flex-col items-center justify-center space-y-[38px] mt-[42px]">
        <div className="flex items-center justify-center gap-2 border border-neutral-300 p-[6px] rounded-[6px]">
          <Button
            variant={planCycle === "monthly" ? "default" : "ghost"}
            className="font-semibold"
            onClick={() => setPlanCycle("monthly")}
          >
            Monthly billing
          </Button>
          <Button
            variant={planCycle === "yearly" ? "default" : "ghost"}
            className="font-semibold"
            onClick={() => setPlanCycle("yearly")}
          >
            Annual billing
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {isLoading && (
            <LoaderCircle className="animate-spin text-[#FFD013]" />
          )}
          {plans.map((plan, index) => (
            <>
              {!plan.is_popular ? (
                <div
                  key={index}
                  className="w-[290px] h-fit rounded-[16px] shadow-md border-t-8 border-[#FFD013] pt-[24px] pb-[32px] flex flex-col justify-between px-4"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src="/svg/Featured icon.svg"
                      alt="icon"
                      width={40}
                      height={40}
                    />
                    <h4 className="font-semibold text-xl text-[#554506] mt-[20px] mb-2">
                      {plan.name}
                    </h4>
                    <div className="flex flex-wrap items-end justify-center gap-[2px] px-[24px]">
                      <p className="text-4xl font-semibold text-neutral-900">
                        {formatPrice(
                          planCycle === "monthly"
                            ? plan.monthly_price
                            : plan.yearly_price
                        ).replace(",00", "")}
                      </p>
                      <span className="text-neutral-600 font-medium">
                        {planCycle === "monthly" ? "/month" : "/year"}
                      </span>
                    </div>
                  </div>
                  <Separator className="my-[32px]" />
                  <div className="px-[24px]">
                    <span className="text-neutral-900 font-semibold">
                      {plan.header}
                    </span>
                    <p className="capitalize font-semibold text-neutral-800">
                      FEATURES
                    </p>
                    <div className="mt-[24px] space-y-[16px]">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/svg/Check icon.svg"
                          alt="icon"
                          width={24}
                          height={24}
                        />
                        <p className="text-neutral-900 truncate">
                          {plan.convo_duration} minutes conversation
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Image
                          src="/svg/Check icon.svg"
                          alt="icon"
                          width={24}
                          height={24}
                        />
                        <p className="text-neutral-900 truncate">
                          {plan.daily_convo} daily conversation
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    disabled={user?.plan?.plan_name === plan.name}
                    onClick={() => onCheckout(plan.id)}
                    size="lg"
                    className="mt-[40px] w-full font-semibold text-neutral-900"
                  >
                    {user?.plan?.plan_name === plan.name
                      ? "Current Plan"
                      : "Get Started"}
                  </Button>
                </div>
              ) : (
                <div className="relative w-[290px] min-h-[500px] rounded-[16px] shadow-2xl border-t-8 bg-[#FFD013] border-[#292929] pt-[24px] pb-[32px]">
                  <Badge className="absolute right-[24px] top-[24px] px-3 py-1">
                    Popular
                  </Badge>
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src="/svg/Featured icon.svg"
                      alt="icon"
                      width={40}
                      height={40}
                    />
                    <h4 className="font-semibold text-xl text-[#332A04] mt-[20px] mb-2">
                      {plan.name}
                    </h4>
                    <div className="flex flex-wrap items-end justify-center gap-[2px] px-[24px]">
                      <p className="text-4xl font-semibold text-neutral-900">
                        {formatPrice(
                          planCycle === "monthly"
                            ? plan.monthly_price
                            : plan.yearly_price
                        ).replace(",00", "")}
                      </p>
                      <span className="text-neutral-600 font-medium">
                        {planCycle === "monthly" ? "/month" : "/year"}
                      </span>
                    </div>
                    <p className="mt-2 text-[#292929]">{plan.tagline}</p>
                  </div>
                  <div className="px-[24px] mt-[48px]">
                    <span className="text-neutral-900 font-semibold">
                      {plan.header}
                    </span>
                    <p className="capitalize font-semibold text-neutral-800">
                      FEATURES
                    </p>
                    <div className="mt-[16px] space-y-[16px]">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/svg/Check icon.svg"
                          alt="icon"
                          width={24}
                          height={24}
                        />
                        <p className="text-neutral-900 truncate">
                          {plan.convo_duration} minutes conversation
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Image
                          src="/svg/Check icon.svg"
                          alt="icon"
                          width={24}
                          height={24}
                        />
                        <p className="text-neutral-900 truncate">
                          {plan.daily_convo} daily conversation
                        </p>
                      </div>
                    </div>
                    <Button
                      disabled={user?.plan?.plan_name === plan.name}
                      onClick={() => onCheckout(plan.id)}
                      size="lg"
                      variant="black"
                      className="mt-[40px] w-full font-semibold shadow"
                    >
                      {user?.plan?.plan_name === plan.name
                        ? "Current Plan"
                        : "Get Started"}
                    </Button>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </section>
      <footer className="flex items-center justify-center my-[32px]">
        <p className="text-xs text-neutral-500 text-center">
          **Prices & currencies may vary depending on your location.
        </p>
      </footer>
    </div>
  );
}

export default PricingPage;
