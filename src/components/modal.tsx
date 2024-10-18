"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ModalProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  ...props
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent {...props}>{children}</DialogContent>
    </Dialog>
  );
};
