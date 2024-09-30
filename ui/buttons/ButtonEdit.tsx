"use client";
import { FormWindow } from "@/app/Providers";
import { buttonNames } from "@/lib/const";
import { ModalFormType } from "@/lib/types";
import { useContext } from "react";

export default function ButtonEdit() {
  const { setFormModal } = useContext(FormWindow)! as ModalFormType;

  return (
    <button
      className="bg-light-white w-full dark:bg-opacity-5 dark:text-light-white medium:max-w-[73px] max-w-[100px] h-[48px] rounded-[28px] font-bold text-gray gap-x-4 hover:bg-light-bg transition-all"
      onClick={() => {
        setFormModal(true);
      }}
    >
      {buttonNames.edit}
    </button>
  );
}
