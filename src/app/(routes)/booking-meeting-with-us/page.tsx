import { BookingMeetingWithUsForm } from "@/components/forms/booking-meeting-with-us-form";
import { Footer } from "@/components/layouts/footer";
import Image from "next/image";

function BookingMeetingWithUsPage() {
  return (
    <main className="bg-[#F5F5F5] py-[24px] sm:py-[64px] flex flex-col items-center justify-center px-4">
      <div className="w-[1168px] h-full bg-white rounded-[6px] flex">
        <div className="flex flex-col w-[528px] bg-[#FFD013] rounded-l-[6px] rounded-r-[20px] border-r border-[#D5AD10]">
          <div className="px-[56px] z-10">
            <div className="mt-[117px] flex items-center gap-2">
              <Image src="/svg/logo.svg" width={54} height={54} alt="logo" />
              <h2 className="text-3xl font-semibold">Kuliah Di Luar Yuk</h2>
            </div>
            <div className="mt-[78px]">
              <h3 className="text-2xl font-medium">
                Unlock Your Future Abroad
              </h3>
              <p className="text-[#525252] mt-[22px] mb-[32px]">
                Learn how Kuliah Di Luar Yuk can help you for plans study
                aboard.
              </p>
              <p className="text-[#525252]">
                In this conversation, we will explore how AI techno can
                facilitate the process of booking and managing meetings for
                students who wish to study abroad.
              </p>
            </div>
          </div>
          <Image
            className="-mt-[150px]"
            src="/svg/booking-meeting-with-us.svg"
            alt="background image"
            width={700}
            height={700}
          />
        </div>
        <div className="ml-[64px]">
          <div className="py-[58px] px-[48px]">
            <h1 className="font-semibold text-[32px]">
              Booking Meeting with us
            </h1>
            <p className="text-[#737373] max-w-[448px] mt-[24px] mb-[48px]">
              AI-powered to streamline the process of booking meeting and
              managing schedules.
            </p>
            <BookingMeetingWithUsForm />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
export default BookingMeetingWithUsPage;
