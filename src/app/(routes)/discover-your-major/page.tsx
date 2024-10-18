"use client";

import { useEffect, useState, Suspense } from "react";
import { DiscoverYourMajorForm } from "@/components/forms/discover-your-major-form";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "next/navigation";
import { Footer } from "@/components/layouts/footer";

const DiscoverYourMajorPage: React.FC = () => {
  const searchParams = useSearchParams(); // Move outside dynamic import
  const [refCode, setRefCode] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const ref = searchParams.get("ref");
    const visitorId = localStorage.getItem("visitorId") || uuidv4();
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("visitorId", visitorId);

    if (ref) {
      setRefCode(ref);
      localStorage.setItem("refCode", ref);
    } else {
      const storedRefCode = localStorage.getItem("refCode");
      if (storedRefCode) {
        setRefCode(storedRefCode);
      }
    }

    const trackVisit = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/track-visit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitorId,
            page: "discover_major",
            visited_at: today,
            ref: refCode,
          }),
        });
      } catch (error) {
        console.error("Failed to track visit", error);
      }
    };

    trackVisit();
  }, [refCode, searchParams]); // Add searchParams to dependencies

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "id" : "en"));
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="bg-[#F5F5F5] py-[24px] sm:py-[64px] flex flex-col items-center justify-center px-4">
        <div className="w-full md:max-w-[864px] rounded-[6px] shadow">
          <div className="bg-[#FFD013] rounded-t-[6px] px-4 sm:px-[32px] py-[20px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h1 className="text-lg sm:text-2xl font-semibold">
                {language === "en"
                  ? "Discover your Major in 60 Seconds"
                  : "Temukan jurusanmu dalam 60 detik"}
              </h1>
              <button
                className="mt-2 md:mt-0 text-sm bg-white text-black py-2 px-4 rounded"
                onClick={toggleLanguage}
              >
                {language === "en"
                  ? "Switch to Indonesian"
                  : "Ganti ke Bahasa Inggris"}
              </button>
            </div>
          </div>
          <div className="bg-white px-4 sm:px-[32px] py-[32px] sm:py-[48px]">
            <DiscoverYourMajorForm refCode={refCode} language={language} />
          </div>
        </div>
        <Footer />
      </main>
    </Suspense>
  );  
};

export default DiscoverYourMajorPage;
