"use client";

import { createContext, useState } from "react";
import { ModalFormType, ModalType } from "../lib/types";

export const ModalWindow = createContext<ModalType | null>(null);
export const FormWindow = createContext<ModalFormType | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setOpenModal] = useState(false);
  const [isFormOpen, setFormModal] = useState(false);

  return (
    <ModalWindow.Provider value={{ isModalOpen, setOpenModal }}>
      <FormWindow.Provider value={{ isFormOpen, setFormModal }}>
        {children}
      </FormWindow.Provider>
    </ModalWindow.Provider>
  );
}
