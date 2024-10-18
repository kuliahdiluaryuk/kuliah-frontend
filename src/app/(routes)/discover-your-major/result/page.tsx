"use client";

import { Dot, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useMajor from "@/hooks/use-major";
import { parseMajorRecommendation } from "@/lib/utils";
import { ParsedMajor } from "@/types";
import { useSearchParams } from "next/navigation";

function DiscoverYourMajorResultPage() {
  const searchParams = useSearchParams();
  const language = searchParams.get("language") || "en";
  const { major } = useMajor();
  const [parsedMajor, setParsedMajor] = useState<ParsedMajor | null>(null);

  useEffect(() => {
    if (major) {
      setParsedMajor(parseMajorRecommendation(major.major_recommendation));
    }
  }, [major]);

  return (
    <main className="bg-[#F5F5F5] py-[24px] sm:py-[64px] flex items-center justify-center px-4">
      <div className="w-[864px] bg-white rounded-[6px] p-4 sm:p-[24px]">
        <div className="flex items-start justify-between">
          <h1 className="font-semibold text-2xl text-neutral-800">
            {language === "en"
              ? "Your Major Suggestions"
              : "Saran Jurusan Kamu"}
          </h1>
          <Button
            size="icon"
            variant="ghost"
            className="w-[24px] h-[24px]"
            asChild
          >
            <Link href="/discover-your-major">
              <X className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        <Separator className="my-[24px]" />

        <div className="bg-[#FEFEE8] border border-[#FFD013] rounded-[6px] p-6 sm:p-[24px] flex flex-col items-center justify-center text-center">
          <div className="flex items-start gap-1">
            <h2 className="text-3xl font-bold text-neutral-800">
              {language === "en" ? "Congratulations!" : "Selamat!"}
            </h2>
            <Image
              alt="star"
              src="/svg/star.svg"
              width={24}
              height={24}
              className=""
            />
          </div>
          <p className="text-neutral-600 mt-[12px]"> {language === "en" ? "Here’s our recommendation:" : "Berikut rekomendasi kami:"}</p>
          <p className="font-semibold text-xl text-neutral-800 mt-[28px]">
            “{major?.major_grouping[0]}”
          </p>
          <p className="font-medium text-neutral-500 mt-[32px]">
          {parsedMajor?.conclusion}
          </p>
        </div>

        <h3 className="mt-[42px] font-semibold text-2xl text-neutral-800">
          {parsedMajor?.introduction}
        </h3>

        <Separator className="mt-[24px] mb-[32px]" />

        <div className="space-y-[24px]">
          {parsedMajor?.majors.map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-[24px] border border-neutral-300 rounded-[6px]"
            >
              <h4 className="font-semibold text-xl text-neutral-700 flex items-center">
                <Dot className="w-8 h-8" /> {item.name}
              </h4>
              <p className="font-medium text-neutral-500 mt-[32px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <Separator className="my-[24px]" />

        <Button
          className="w-full font-semibold text-neutral-900 text-base"
          size="lg"
          asChild
        >
          <Link href="/discover-your-major">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
export default DiscoverYourMajorResultPage;
