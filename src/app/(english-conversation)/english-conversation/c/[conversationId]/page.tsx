"use client";

import Link from "next/link";

import UserAvatar from "@/components/auth/user-avatar";
import { SidebarNav } from "@/components/layouts/sidebar-nav";
import { Button } from "@/components/ui/button";
import { getDetailConversation } from "@/lib/utils";
import { Conversation, Message } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ConversationHistoryPage() {
  const [conversation, setConversation] = useState<Conversation | null>(null);

  const params = useParams();

  useEffect(() => {
    const getConversation = async () => {
      const res = await getDetailConversation(params.conversationId);
      setConversation(res);
    };

    getConversation();
  }, []);

  if (!conversation) {
    return <p>Loading...</p>;
  }

  const messages: Message[] = JSON.parse(conversation.messages);

  return (
    <div className="flex">
      <SidebarNav />
      <main className="relative bg-[#F5F5F5] min-h-[90vh] w-full flex flex-col items-center py-[24px] lg:py-[64px] px-[24px]">
        <div className="flex flex-col justify-between bg-white w-full max-w-[900px] h-full rounded-[6px]">
          <div className="space-y-[24px] py-[20px] px-4 md:px-6 lg:px-[60px]">
            {messages?.map((result, index) => {
              if (result.role === "user") {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-end space-y-[10px]"
                  >
                    <UserAvatar className="w-[40px] h-[40px] rounded-[8px] rounded-bl-none border border-[#FFD013]" />
                    <div className="max-w-[550px] bg-[#FFEFB0] border border-[#FFD013] rounded-[6px] py-[14px] px-[16px] mr-[30px] md:mr-[50px] ml-[10px]">
                      {result.content}
                    </div>
                  </div>
                );
              } else if (
                result.role === "assistant" &&
                index + 1 < messages.length
              ) {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-start space-y-[10px]"
                  >
                    <UserAvatar
                      user={{ avatar: "/svg/logo.svg", name: "AI Picture" }}
                      className="w-[40px] h-[40px] rounded-[8px] rounded-br-none border border-[#FFD013]"
                    />
                    <div className="max-w-[550px] bg-[#fff] border border-[#BDBDBD] rounded-[6px] py-[14px] px-[16px] ml-[30px] md:ml-[50px] mr-[10px]">
                      {result.content}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="w-full flex justify-end px-[24px] py-[32px]">
            <Button asChild size="lg" className="font-semibold w-full md:w-fit">
              <Link
                href={`/english-conversation/c/${params.conversationId}/result`}
              >
                See the Result
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
