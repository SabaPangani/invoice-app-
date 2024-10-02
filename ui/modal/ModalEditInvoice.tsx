"use client";
import React from "react";
import FormInvoice from "../form/FormInvoice";

export default function ModalEditInvoice({
  isEditing,
  invoice,
  id,
}: {
  isEditing: boolean;
  invoice?: any;
  id?: string;
}) {
  return (
    <div
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        event.stopPropagation()
      }
    >
      <FormInvoice
        isEditing={isEditing}
        invoice={invoice!}
        id={id!}
        isModal={true}
      />
    </div>
  );
}
