"use client"
import { ModalWindow } from "@/app/Providers";
import { buttonNames } from "@/lib/const";
import { ModalType } from "@/lib/types";
import { useContext } from "react";

export default function ButtonDelete() {
  const { setOpenModal } = useContext(ModalWindow)! as ModalType;
  return (
    <button
      className="bg-red w-full medium:max-w-[89px] max-w-[120px] h-[48px] rounded-[28px] font-bold text-white gap-x-4 hover:bg-red-hover transition-all"
      onClick={() => {
        setOpenModal(true);
      }}
    >
      {buttonNames.delete}
    </button>
  );
}
