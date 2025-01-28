import { create } from "zustand";

import { User } from "@/types";

interface Session {
  user: User | undefined;
  setUser: (data: User) => void;
}

const useSession = create<Session>()((set) => ({
  user: undefined,
  setUser: (data: User) => {
    set({ user: data });
  },
}));

export default useSession;
