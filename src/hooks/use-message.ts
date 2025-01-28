import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Message } from "@/types";
import { ChatMessageType } from "@/transcriptions/TranscriptionTile";

interface MessageState {
  messages: ChatMessageType[];
  setMessages: (data: ChatMessageType[]) => void;
}

const useMessage = create<MessageState>()(
  persist(
    (set) => ({
      messages: [],
      setMessages: (data: ChatMessageType[]) => {
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