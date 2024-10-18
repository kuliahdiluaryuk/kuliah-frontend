import { create } from "zustand";

interface useLimitModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void
}

export const useLimitModal = create<useLimitModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
})) 