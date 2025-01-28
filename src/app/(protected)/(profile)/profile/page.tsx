"use client";

import { ArrowUpRight, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import useSession from "@/hooks/use-session";
import { formatPrice } from "@/lib/utils";

function ProfilePage() {
  const { user } = useSession();

  if (!user) {
    return <p>Loading...</p>;
  }

  const dateObj = new Date(user.created_at);
  const formattedDate = dateObj.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <section className="space-y-[32px] lg:space-y-0 lg:grid grid-cols-4">
        <p className="text-neutral-700 font-semibold text-sm">
          Profile details
        </p>
        <div className="col-span-3 min-h-[308px] border border-neutral-300 p-4 sm:p-[24px] rounded-[6px]">
          <div className="flex justify-between">
            <div className="flex gap-4 sm:gap-[24px]">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt="profile"
                  width={80}
                  height={80}
                  className="rounded-[3.56px]"
                />
              ) : (
                <div className="w-[80px] h-[80px] bg-muted rounded-[3.56px] flex items-center justify-center">
                  <Icons.user height={70} width={70} />
                </div>
              )}
              <div className="space-y-[6px]">
                <div className="flex flex-col md:flex-row gap-2 items-start">
                  <p className="text-neutral-900 font-medium text-lg">
                    {user.name}
                  </p>
                  <Badge variant="yellow" className="shadow-none">
                    {user.plan ? user.plan?.plan_name : "Free"}
                  </Badge>
                </div>
                <p className="text-neutral-500 text-sm">
                  {user.email.length > 30
                    ? `${user.email.slice(0, 30)}...`
                    : user.email}
                </p>
                <p className="text-neutral-500 text-xs font-medium">
                  Join {formattedDate}
                </p>
              </div>
            </div>
            <Button className="hidden lg:flex shadow-none font-medium">
              <Link href={"/account"} className="flex">
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </Link>
            </Button>
          </div>
          <div className="space-y-[24px] lg:space-y-0 lg:grid grid-cols-2 mt-[24px] gap-[32px]">
            <div>
              <p className="text-neutral-600 font-medium">First Name</p>
              <p className="text-neutral-900 font-medium text-lg">
                {user.name.split(" ")[0]}
              </p>
            </div>
            <div>
              <p className="text-neutral-600 font-medium">Email Address</p>
              <p className="text-neutral-900 font-medium text-lg">
                {user.email}
              </p>
            </div>
            <div>
              <p className="text-neutral-600 font-medium">Phone Number</p>
              <p className="text-neutral-900 font-medium text-lg">
                {user.phone}
              </p>
            </div>
            <div>
              <p className="text-neutral-600 font-medium">Country</p>
              <p className="text-neutral-900 font-medium text-lg">
                {user.country}
              </p>
            </div>
            <Button className="flex lg:hidden w-full shadow-none font-medium">
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </Button>
          </div>
        </div>
      </section>
      <Separator className="my-[32px]" />
      <section>
        <h3 className="text-lg font-semibold text-neutral-800">
          Billing & Payment Method
        </h3>
        <p className="text-neutral-500 text-sm ">
          Update your billing details.
        </p>
      </section>
      <Separator className="mt-[20px] mb-[24px]" />
      <section className="lg:grid grid-cols-4">
        <p className="text-neutral-700 font-semibold text-sm mb-[32px] lg:mb-0">
          Subcription Plan
        </p>
        <div className="col-span-3 sm:h-[185px] border border-neutral-300 rounded-[6px]">
          <div className="flex flex-col md:flex-row justify-between items-start p-4 sm:px-[24px] sm:py-[28px] gap-2">
            <div className="space-y-[4px]">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm md:text-lg text-neutral-800">
                  {user.plan ? user.plan?.plan_name : "Free"} plan
                </p>
                <Badge
                  variant="yellowOutline"
                  className="shadow-none capitalize"
                >
                  {user.plan ? user.plan?.plan_cycle : "Monthly"}
                </Badge>
              </div>
              <p className="text-neutral-500 text-sm">
                Our top-tier plan designed for unlimited users.
              </p>
            </div>
            <div className="flex items-end gap-[2px]">
              <p className="text-2xl md:text-5xl font-semibold text-neutral-900">
                {formatPrice(user.plan ? user.plan?.plan_price : 0).replace(
                  ",00",
                  "",
                )}
              </p>
              <span className="text-xs sm:text-base text-neutral-600 font-medium">
                {user.plan?.plan_cycle === "yearly" ? "per year" : "per month"}
              </span>
            </div>
          </div>
          <Separator className="bg-neutral-300" />
          <div className="flex justify-end p-4 sm:px-[24px] sm:py-[16px]">
            <Button className="w-full sm:w-fit font-semibold shadow-none">
              Upgrade to Pro+ <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
        <div className="col-span-3 col-start-2 min-h-[263px] border border-neutral-300 rounded-[6px] mt-[32px]">
          <div className="p-[16px] flex items-center gap-4">
            <Image
              src="/svg/Featured icon.svg"
              alt="icon"
              width={26}
              height={26}
            />
            <p className="font-semibold text-neutral-800">Cancel Subcription</p>
          </div>
          <Separator />
          <div className="px-4 sm:px-[24px] py-[16px]">
            <p className="text-[#656565] text-sm">
              When you cancel your account, you lose access to Pro account plans
              and billings, and we can process your account for 2 days. You can
              continue plan billings after canceling your account.
            </p>
            <div className="flex items-center gap-2 mt-[20px]">
              <Checkbox id="confirm" />
              <label
                htmlFor="confirm"
                className="text-xs text-neutral-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Confirm that you want to cancel your account
              </label>
            </div>
            <Separator className="mt-[24px] mb-[20px]" />
            <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-2 sm:gap-[30px]">
              <Button variant="outline">Learn More</Button>
              <Button variant="destructive">Cancel Subcriptions</Button>
            </div>
          </div>
        </div>
      </section>
      {/* <Separator className="my-[32px]" />
      <section>
        <h3 className="text-lg font-semibold text-neutral-800">
          Referral Program
        </h3>
        <p className="text-neutral-500 text-sm">
          Invite friends to join our platform and earn rewards.
        </p>
      </section>
      <Separator className="mt-[20px] mb-[24px]" />
      <section className="space-y-[32px] xl:space-y-0 xl:grid grid-cols-4">
        <p className="text-neutral-700 font-semibold text-sm">Referral users</p>
        <div className="col-span-3 flex flex-col lg:flex-row gap-[24px] justify-between">
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-[8px]">
              Referral Program
            </h3>
            <p className="text-neutral-500 text-sm ">
              New members have joined this account.
            </p>
            <p className="mt-[18px] font-medium text-sm text-neutral-900">
              14 of 20 users
            </p>
            <Progress value={10} className="mt-[12px] max-w-[356px]" />
            <Badge variant="outline" className="mt-2 py-1 px-2 shadow-md">
              10%
            </Badge>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-[8px]">
              Unique Code Referral
            </h3>
            <p className="text-neutral-500 text-sm ">
              Share your code to your media sosial
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 my-[14px]">
              <Input
                placeholder="BC257MAUDYXP546OPULIX"
                className="w-full sm:w-[319px]"
              />
              <Button className="font-semibold shadow-none w-full sm:w-fit">
                Copy <Copy className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="flex justify-center sm:justify-start items-center gap-[14px]">
              <Link href="/">
                <Image
                  src="svg/share-circle.svg"
                  alt="share"
                  width={40}
                  height={40}
                />
              </Link>
              <Link href="/">
                <Image
                  src="svg/facebook-circle.svg"
                  alt="facebook"
                  width={40}
                  height={40}
                />
              </Link>
              <Link href="/">
                <Image
                  src="svg/instagram-circle.svg"
                  alt="instagram"
                  width={40}
                  height={40}
                />
              </Link>
              <Link href="/">
                <Image
                  src="svg/whatsapp-circle.svg"
                  alt="whatsapp"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default ProfilePage;
