import React from "react";
import { paymentTermsOptions } from "./formData";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput } from "@/lib/types";

export default function FormPaymentSection({
  register,
  errors,
  isEditing,
}: {
  register: UseFormRegister<FormInput>;
  errors: FieldErrors<FormInput>;
  isEditing: boolean;
}) {
  console.log(isEditing);
  return (
    <section className="mt-10 flex flex-col items-center justify-between gap-y-5 gap-x-5 xl:grid xl:grid-cols-2 xl:gap-x-6 xl:gap-y-6">
      <div className="max-w-full w-full">
        <label className="label">Invoice Date</label>
        <input
          {...register("invoiceDate", { required: "The field is required" })}
          type={`${isEditing ? "text" : "date"}`}
          disabled={isEditing}
          className="inputField"
        />
        {errors["invoiceDate"] && (
          <p className="text-red mt-2">{errors["invoiceDate"]?.message}</p>
        )}
      </div>
      <div className="flex flex-col max-w-full w-full">
        <label className="label">Payment Terms</label>
        <select {...register("paymentTerms")} className="selectField">
          {paymentTermsOptions.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors["paymentTerms"] && (
          <p className="text-red mt-2">{errors["paymentTerms"]?.message}</p>
        )}
      </div>
      <div className="max-w-full w-full col-span-2">
        <label className="label">Project Description</label>
        <input
          {...register("description", { required: "The field is required" })}
          type="text"
          className="inputField"
        />
        {errors["description"] && (
          <p className="text-red mt-2">{errors["description"]?.message}</p>
        )}
      </div>
    </section>
  );
}
