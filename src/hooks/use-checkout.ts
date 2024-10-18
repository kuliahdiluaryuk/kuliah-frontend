import { create } from "zustand";

interface CheckoutState {
  planId: number | null;
  planCycle: "monthly" | "yearly" | null;
  addPlanId: (data: number) => void;
  addPlanCycle: (data: "monthly" | "yearly") => void;
}

const useCheckout = create<CheckoutState>()((set) => ({
  planId: null,
  planCycle: null,
  addPlanId: (data: number) => {
    set({ planId: data });
  },
  addPlanCycle: (data: "monthly" | "yearly") => {
    set({ planCycle: data });
  },
}));

export default useCheckout;
