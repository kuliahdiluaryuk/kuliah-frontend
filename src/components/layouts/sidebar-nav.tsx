"use client";

import { LogOut, MessageSquare, Mic, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn, getAllConversation, logout } from "@/lib/utils";

export function SidebarNav() {
  const [close, setClose] = useState<boolean>(false);
  const [results, setResults] = useState<any[]>([]);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const getAll = async () => {
      const conversation = await getAllConversation();
      if (conversation.length > 0) {
        setResults(conversation);
      }
    };

    getAll();
  }, []);

  const getTopicLabel = (topic: string) => {
    switch (topic) {
      case "introduction":
        return "Greetings and Introductions";
      case "bargaining":
        return "Bargaining";
      case "travel":
        return "Travel and Holidays";
      case "food":
        return "Food and Dining";
      case "education":
        return "Education and Learning";
      case "technology":
        return "Technology and Gadgets";
      case "work":
        return "Work and Career";
      case "personal":
        return "Personal Development";
      default:
        return "Unknown Topic";
    }
  };

  return (
    <aside className="hidden sticky top-[10vh] h-[90vh] xl:flex md:flex-col space-y-5 border-r border-gray-200 py-[20px] w-[320px] bg-white">
      <nav className="h-full flex flex-col justify-between">
        <div>
          <div className="px-[16px]">
            <Button
              asChild
              variant="outline"
              className="w-full text-[#737373] flex items-center justify-between"
            >
              <Link href="/english-conversation">
                Start Conversation <Mic className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <ScrollArea
            className={cn(
              "px-[16px] mt-[28px]",
              close ? "h-[40vh]" : "h-[60vh]",
            )}
          >
            <div className="space-y-[28px]">
              <div>
                {results.length > 0 ? (
                  <>
                    <p className="text-[#404040] font-semibold text-sm">
                      Today 
                    </p>
                    <ul className="mt-[14px] space-y-[4px]">
                      {results.map((result, index) => (
                        <li key={index}>
                          <Button
                            onClick={() =>
                              router.replace(
                                `/english-conversation/c/${result.id}`,
                              )
                            }
                            variant="ghost"
                            className={cn(
                              "justify-start w-full",
                              params.conversationId == result.id
                                ? "text-[#171717]"
                                : "text-[#737373]",
                            )}
                          >
                            <>
                              <span>
                                <MessageSquare className="w-4 h-4 mr-2" />
                              </span>
                              <span className="truncate">
                              {getTopicLabel(result.topic)}
                              </span>
                            </>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            </div>
          </ScrollArea>
        </div>

        <div className="px-[16px] space-y-[12px] mt-[24px]">
          <Button
            variant="ghost"
            className="justify-start w-full text-[#737373] font-semibold"
          >
            <Trash2 className="w-6 h-6 mr-2" />
            Clear Conversations
          </Button>
          <Separator />
          <Button
            onClick={logout}
            variant="ghost"
            className="justify-start w-full text-[#737373] font-semibold"
          >
            <LogOut className="w-6 h-6 mr-2" />
            Log out
          </Button>
        </div>
      </nav>
    </aside>
  );
}
