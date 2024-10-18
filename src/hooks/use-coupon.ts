import { create } from "zustand";

interface CouponState {
  couponValue: string;
  setCouponValue: (data: string) => void;
}

const useCoupon = create<CouponState>()((set) => ({
  couponValue: "",
  setCouponValue: (data: string) => {
    set({ couponValue: data });
  },
}));

export default useCoupon;
