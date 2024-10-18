"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_DAILY_CONVO_LIMIT } from "@/constants";
import useInstruction from "@/hooks/use-instruction";
import { useLimitModal } from "@/hooks/use-limit-modal";
import useSession from "@/hooks/use-session";
import {
  englishConversationPayload,
  englishConversationSchema,
} from "@/lib/validators/english-conversation";

export function EnglishConversationForm() {
  const { addInstrunction } = useInstruction();
  const limitModal = useLimitModal();

  const form = useForm<englishConversationPayload>({
    resolver: zodResolver(englishConversationSchema),
  });

  const router = useRouter();
  const { user } = useSession();

  const onSubmit = async (values: englishConversationPayload) => {
    // Check conversation limit
    const dailyConversation = Cookies.get("dailyConversation");
    if (dailyConversation) {
      if (user?.plan) {
        if (parseInt(dailyConversation) >= user.plan.daily_convo) {
          return limitModal.onOpen();
        }
      } else {
        if (parseInt(dailyConversation) >= DEFAULT_DAILY_CONVO_LIMIT) {
          return limitModal.onOpen();
        }
      }
    }

    addInstrunction({
      assistant: values.assistant,
      level: values.level,
      topic: values.topic,
      language: "english",
    });
    router.push("/english-conversation/start");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-between"
      >
        <div className="grid grid-cols-1 xl:grid-cols-3 w-[256px] xl:w-[772px] gap-[18px] border rounded-[6px] p-2">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Level English" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Topic Conversation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="introduction">
                      Greetings and Introductions
                    </SelectItem>
                    <SelectItem value="bargaining">Bargaining</SelectItem>
                    <SelectItem value="travel">Travel and Holidays</SelectItem>
                    <SelectItem value="food">Food and Dining</SelectItem>
                    <SelectItem value="education">
                      Education and Learning
                    </SelectItem>
                    <SelectItem value="technology">
                      Technology and Gadgets
                    </SelectItem>
                    <SelectItem value="work">Work and Career</SelectItem>
                    <SelectItem value="personal">
                      Personal Development
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assistant"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Voice" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          size="icon"
          className="rounded-full h-20 w-20 md:h-[90px] md:w-[90px] mt-6 md:mt-24"
        >
          <Mic className="w-8 h-8" />
        </Button>
      </form>
    </Form>
  );
}
