"use client";

import { EnglishConversationForm } from "@/components/forms/english-conversation-form";
import { SidebarNav } from "@/components/layouts/sidebar-nav";
import useSession from "@/hooks/use-session";

function EnglishConversationPage() {
  const { user } = useSession();

  return (
    <div className="flex">
      {user && <SidebarNav />}
      <main className="relative bg-[#F5F5F5] h-[90vh] w-full flex flex-col items-center pt-[100px] sm:pt-[150px]">
        {/* <div className="flex flex-col items-center justify-center space-y-[8px]">
          <Image src="/svg/logo.svg" width={52} height={52} alt="logo" />
          <h1 className="font-medium text-lg md:text-2xl text-[#262626]">
          Find Out Your Conversation Level
          </h1>
          <p className="text-[#737373]">Let’s start click button voice below</p>
        </div> */}
        <div className="mt-[20px]">
          <EnglishConversationForm />
        </div>
      </main>
    </div>
  );
}

export default EnglishConversationPage;