import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Major } from "@/types";

interface MajorState {
  major: Major | null;
  setMajor: (data: Major) => void;
}

const useMajor = create<MajorState>()(
  persist(
    (set) => ({
      major: null,
      setMajor: (data: Major) => {
        set({ major: data });
      },
    }),
    {
      name: "major-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useMajor;
