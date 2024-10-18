import axios from "axios";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import useCheckout from "@/hooks/use-checkout";
import useCoupon from "@/hooks/use-coupon";
import { getToken } from "@/lib/cookies";
import { formatPrice } from "@/lib/utils";
import { Plan } from "@/types";

export const OrderSummary = () => {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [couponData, setCouponData] = useState<any>(null);
  const [responseType, setResponseType] = useState<"success" | "error" | null>(
    null,
  );
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [originalPrice, setOriginalPrice] = useState<number | null>(null);

  const { toast } = useToast();
  const { planId, planCycle } = useCheckout();
  const { couponValue, setCouponValue } = useCoupon();
  const router = useRouter();

  useEffect(() => {
    const getPlans = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/plan`,
        );
        const findPlan = response.data.message.find(
          (o: Plan) => o.id === planId,
        );

        setPlan(findPlan);

        const initialPrice =
          planCycle === "yearly"
            ? findPlan.yearly_price
            : findPlan.monthly_price;
        setOriginalPrice(initialPrice);
        setTotalPrice(initialPrice);
      } catch (error) {
        console.log(error);
        toast({ variant: "destructive", title: "Something went wrong." });
      } finally {
        setIsLoading(false);
      }
    };

    if (!planId) {
      router.push("/subscriptions");
    } else {
      getPlans();
    }
  }, [planId, planCycle, toast]);

  const applyCoupon = async (couponCode: string) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/coupon-validator`,
        { coupon_code: couponCode },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        const { data } = response.data;
        setCouponData(data);
        setResponseType("success");

        const price = Number(plan?.[`${planCycle}_price` as keyof Plan] || 0);
        const nominal =
          typeof data.nominal === "number"
            ? data.nominal
            : parseFloat(data.nominal);
        const discount =
          data.type === "percentage"
            ? (price * nominal) / 100
            : data.type === "fix"
            ? nominal
            : 0;
        const discountedPrice = Math.max(price - discount, 0);

        setTotalPrice(discountedPrice);
      } else {
        handleCouponError("Invalid coupon");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleCouponError(
          error.response?.data?.message || "Error applying coupon.",
        );
      } else {
        handleCouponError("An unexpected error occurred.");
      }
    }
  };

  const handleCouponError = (errorMessage: string) => {
    setCouponData(null);
    setResponseType("error");
    setTotalPrice(
      planCycle === "yearly"
        ? plan?.yearly_price || 0
        : plan?.monthly_price || 0,
    );
    toast({ variant: "destructive", title: errorMessage });
  };

  const price = plan?.[`${planCycle}_price` as keyof Plan];

  const discount =
    couponData &&
    (couponData.type === "percentage"
      ? typeof price === "number"
        ? (price * couponData.nominal) / 100
        : 0
      : couponData.type === "fix"
      ? couponData.nominal
      : 0);

  return (
    <div className="w-full rounded-[6px] bg-white border-2 border-[#F0F1F2] p-[32px]">
      <h2 className="font-medium text-xl text-[#292929]">Order Summary</h2>
      <div className="mt-[12px] space-y-[8px]">
        <div className="relative">
          <Image
            src="/svg/discount-percent-coupon.svg"
            width={24}
            height={24}
            className="absolute left-[18px] top-[10px]"
            alt="Coupon"
          />
          <Input
            placeholder="Coupon"
            className="pl-[58px] h-[44px]"
            value={couponValue}
            onChange={(e) => setCouponValue(e.target.value)}
          />
          {responseType === "error" && (
            <p className="mt-[8px] text-sm text-red-500">
              {couponData ? couponData.message : "Invalid coupon"}
            </p>
          )}
        </div>
        <Button
          size="lg"
          className="w-full font-semibold text-base"
          onClick={() => applyCoupon(couponValue)}
        >
          Apply
        </Button>
      </div>
      <Separator className="my-[24px]" />
      {isLoading || !plan ? (
        <div className="flex items-center justify-center">
          <LoaderCircle className="animate-spin text-[#FFD013]" />
        </div>
      ) : (
        <>
          <div className="space-y-[16px]">
            <p className="font-medium text-lg text-[#292929]">Total Product</p>
            <div className="flex items-center justify-between">
              <p className="font-medium text-base text-neutral-500">
                {plan.name}
              </p>
              <span className="font-medium text-base text-[#292929]">
                {formatPrice(originalPrice || 0).replace(",00", "")}
              </span>
            </div>
            {couponData && (
              <div className="flex items-center justify-between">
                <p className="font-medium text-base text-neutral-500">
                  Discount
                </p>
                <span className="font-medium text-base text-green-500">
                  {formatPrice(discount).replace(",00", "")}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <p className="font-medium text-base text-neutral-500">Package</p>
              <span className="font-medium text-base text-[#292929] capitalize">
                {planCycle === "yearly" ? "Yearly" : "Monthly"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-base text-neutral-500">Coupon</p>
              <span className="font-medium text-base text-[#292929]">
                {couponData ? couponData.code : "-"}
              </span>
            </div>
          </div>
          <Separator className="my-[24px]" />
          <div className="flex items-center justify-between gap-1">
            <p className="font-medium text-lg text-[#292929]">
              Total Amount Due
            </p>
            <span className="font-medium text-2xl text-[#292929]">
              {formatPrice(totalPrice || 0).replace(",00", "")}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
