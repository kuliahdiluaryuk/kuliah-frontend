"use client";

import { useEffect, useState } from "react";

import { LimitModal } from "@/components/modals/limit-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LimitModal />
    </>
  );
};
