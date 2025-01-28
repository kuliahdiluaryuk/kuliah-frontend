"use client";

import CalendlyEmbed from "@/components/CalendlyEmbed";
import { BookingMeetingWithUsForm } from "@/components/forms/booking-meeting-with-us-form";
import { Footer } from "@/components/layouts/footer";
import { InlineWidget } from "react-calendly";
import Image from "next/image";

function BookingMeetingWithUsPage() {
  return (
    <main className="bg-[#F5F5F5] py-[24px] sm:py-[64px] flex flex-col items-center justify-center px-4">
      {/* <CalendlyEmbed url="https://calendly.com/kuliah-diluar-yuk?background_color=ffd013&primary_color=ffd013" /> */}
      <InlineWidget
        url="https://calendly.com/kuliah-diluar-yuk"
        styles={{
          height: "700px",
          width: "100%"
        }}
        pageSettings={{ 
          primaryColor: "#ffd013",
         }}
      />
      <Footer />
    </main>
  );
}
export default BookingMeetingWithUsPage;
