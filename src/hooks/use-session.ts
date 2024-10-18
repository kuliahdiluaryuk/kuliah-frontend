import { create } from "zustand";

import { User } from "@/types";

interface Session {
  user: User | null;
  setUser: (data: User) => void;
}

const useSession = create<Session>()((set) => ({
  user: null,
  setUser: (data: User) => {
    set({ user: data });
  },
}));

export default useSession;
