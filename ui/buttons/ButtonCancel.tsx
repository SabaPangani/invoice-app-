"use client"
import { FormWindow } from "@/app/Providers";
import { buttonNames } from "@/lib/const";
import { ModalFormType } from "@/lib/types";
import { useContext } from "react";

export default function ButtonCancel() {
  const { setFormModal } = useContext(FormWindow) as ModalFormType

  return (
    <button
      className="bg-light-bg dark:bg-dark2 w-full max-w-[120px] h-[56px] rounded-[28px] font-bold text-gray hover:bg-black transition-all"
      type="button"
      onClick={() => {
        setFormModal(false);
      }}
    >
      {buttonNames.cancel}
    </button>
  );
}
