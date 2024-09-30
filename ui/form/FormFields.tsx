import { FormField, FormInput } from "@/lib/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export default function FormFields({
  data,
  register,
  errors,
}: {
  data: FormField[];
  register: UseFormRegister<FormInput>;
  errors: FieldErrors<FormInput>;
}) {
  return (
    <>
      {data.map((field) => (
        <div
          key={field.id}
          className={`text-left w-full col-span-${field.gridCols} md:col-span-${field.gridTabletCols}`}
        >
          <label className="label dark:text-light-white">{field.label}</label>
          <input
            {...register(field.name, { required: "The field is required" })}
            className={`border mt-1 dark:text-white text-black dark:bg-dark2 dark:border-none dark:text-text dark:bg-cardColor text-sm font-bold max-w-full w-full outline-none rounded m-0 py-3 px-4 sm:col-span-${
              field.gridCols
            } col-span-${field.gridTabletCols}
              ${"border-secondaryPale"}`}
            type={field.type}
          />
          {errors[field.name] && (
            <p className="text-red mt-2">{errors[field.name]?.message}</p>
          )}
        </div>
      ))}
    </>
  );
}
