"use client";
import React, { useContext } from "react";
import { ModalWindow } from "@/app/Providers";
import { ModalType } from "@/lib/types";
import { buttonNames } from "@/lib/const";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
type ModalDeleteInvoiceProps = {
  id: string;
  handleClick: () => void;
};
export default function ModalDeleteInvoice({
  id,
  handleClick,
}: ModalDeleteInvoiceProps) {
  const { setOpenModal } = useContext(ModalWindow) as ModalType;
  const router = useRouter();
  function cancelDeletionInvoice() {
    setOpenModal(false);
  }
  const {
    formState: { isSubmitting },
  } = useForm();
  const deleteInvoice = async () => {
    try {
      await handleClick();
      if (!isSubmitting) {
        router.push(`/`);
        setOpenModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="absolute medium:w-[300px] dark:bg-dark2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg px-6 py-14 flex flex-col gap-y-8"
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        event.stopPropagation()
      }
    >
      <div>
        <h1 className="text-black font-bold text-3xl mb-2 dark:text-white">Confirm Deletion</h1>
        <p className="text-gray dark:text-light-white">
          Are you sure you want to delete invoice #{id}? This action cannot be
          undone.
        </p>
      </div>
      <div className="flex justify-end items-center gap-x-3">
        <button
          className="bg-light-bg w-full max-w-[120px] h-[56px] rounded-[28px] font-bold text-gray hover:bg-black transition-all"
          type="button"
          onClick={cancelDeletionInvoice}
        >
          {buttonNames.cancel}
        </button>
        <button
          className="bg-red w-full max-w-[120px] h-[56px] rounded-[28px] font-bold text-white gap-x-4 hover:bg-red-hover transition-all"
          onClick={deleteInvoice}
        >
          {buttonNames.delete}
        </button>
      </div>
    </div>
  );
}
