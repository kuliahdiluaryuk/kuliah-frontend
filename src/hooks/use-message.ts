import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Message } from "@/types";

interface MessageState {
  messages: Message[];
  setMessages: (data: Message[]) => void;
}

const useMessage = create<MessageState>()(
  persist(
    (set) => ({
      messages: [],
      setMessages: (data: Message[]) => {
        set({ messages: data });
      },
    }),
    {
      name: "messages-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useMessage;
