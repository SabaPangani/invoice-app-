"use client";
import { FormWindow } from "@/app/Providers";
import { buttonNames } from "@/lib/const";
import { ModalFormType } from "@/lib/types";
import { useContext } from "react";

export default function ButtonDiscard() {
  const { setFormModal } = useContext(FormWindow) as ModalFormType;

  return (
    <button
      className="bg-light-bg dark:bg-dark2 w-full max-w-[96px] h-[48px] rounded-[28px] font-bold text-gray hover:bg-black transition-all medium:text-sm"
      type="button"
      onClick={() => {
        setFormModal(false);
      }}
    >
      Discard
    </button>
  );
}
