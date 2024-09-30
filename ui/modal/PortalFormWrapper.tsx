"use client";

import { useContext, useEffect } from "react";
import { FormWindow } from "@/app/Providers";
import Portal from "@/app/Portal";
import { ModalFormType } from "@/lib/types";
export default function PortalFormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isFormOpen, setFormModal } = useContext(FormWindow) as ModalFormType;

  useEffect(() => {
    isFormOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "scroll");
  }, [isFormOpen]);

  return isFormOpen ? (
    <Portal
      classes="fixed left-32 top-0 w-full max-w-full h-full flex items-start bg-black bg-opacity-50 z-10 overflow-y-auto large:top-20 large:left-0"
      closePortal={() => setFormModal(false)}
    >
      {children}
    </Portal>
  ) : null;
}
