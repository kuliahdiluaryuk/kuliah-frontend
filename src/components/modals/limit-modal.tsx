"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { RxRocket } from "react-icons/rx";

import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLimitModal } from "@/hooks/use-limit-modal";
import useSession from "@/hooks/use-session";

export const LimitModal = () => {
  const limitModal = useLimitModal();
  const { user } = useSession();
  const router = useRouter();

  const isUserAvailable = user !== null;

  return (
    <Modal isOpen={limitModal.isOpen} onClose={limitModal.onClose} className="w-11/12 rounded-md">
      <Image
        src="/svg/limit-image.svg"
        alt="Limit Image"
        width={464}
        height={256}
      />
      <div className="flex flex-col items-center justify-center text-center space-y-[12px]">
        <h2 className="font-semibold text-3xl text-neutral-800  ">
        Oops, you're out of chat time!
        </h2>
        <p className="text-base text-neutral-500">
        {isUserAvailable
            ? "Sign up and claim your 5 free minutes each day!"
            : "Don’t stop now—there’s so much more to say! Let’s keep the chat rolling; we love a good talk!"}
          <span className="fixed pl-1">
            <RxRocket className="text-[#EF4444] w-[20px] h-[20px]" />
          </span>
        </p>
      </div>
      <Separator className="mt-[40px] mb-[24px]" />
      <div className="flex gap-3 mb-6">
        <Button
          variant="outline"
          className="w-full text-base font-semibold"
          onClick={() => limitModal.onClose()}
        >
          Done
        </Button>
        <Button
          className="w-full text-base font-semibold"
          onClick={() => {
            router.push("/subscriptions");
            limitModal.onClose();
          }}
        >
          {isUserAvailable ? "Claim it now" : "Let’s Talk More"}
        </Button>
      </div>
    </Modal>
  );
};
