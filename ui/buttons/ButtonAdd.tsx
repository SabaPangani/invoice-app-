"use client";
import { FormWindow } from "@/app/Providers";
import { buttonNames } from "@/lib/const";
import { ModalFormType, ModalType } from "@/lib/types";
import { useContext } from "react";

export default function ButtonAdd() {
  const { setFormModal } = useContext(FormWindow)! as ModalFormType;
  return (
    <button
      className="bg-primary w-full medium:max-w-[80px] max-w-[170px] h-[56px] rounded-[28px] flex items-center justify-center font-bold text-white gap-x-1 transition-all"
      onClick={() => {
        setFormModal(true);
      }}
    >
      <i className="bi bi-plus rounded-full text-white text-xl"></i>
      New <span className="medium:hidden">Invoice</span>
    </button>
  );
}
