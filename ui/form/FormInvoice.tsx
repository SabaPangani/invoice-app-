"use client";
import ButtonCancel from "../buttons/ButtonCancel";
import ButtonSave from "../buttons/ButtonSave";
import FormFields from "./FormFields";
import FormHeader from "./FormHeader";
import FormPaymentSection from "./FormPaymentSection";
import FormSection from "./FormSection";
import { billFromData, billToData } from "./formData";
import { FormInput, Invoice, Item, ModalFormType, Status } from "@/lib/types";
import { defaultFormValues } from "./formData";
import { Fragment, useContext, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { createNewInvoice, editInvoice } from "@/lib/actions";
import ButtonDraft from "../buttons/ButtonDraft";
import ButtonSend from "../buttons/ButtonSend";
import { FormWindow } from "@/app/Providers";

export default function FormInvoice({
  isEditing,
  invoice,
  isModal,
  id,
}: {
  isEditing: boolean;
  invoice: Invoice;
  id: string;
  isModal: boolean;
}) {
  const { setFormModal } = useContext(FormWindow)! as ModalFormType;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    getValues,
  } = useForm<FormInput>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: defaultFormValues(invoice),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  console.log(fields)

  const onFormSubmit = async (data: FormInput) => {
    try {
      if (isEditing) {
        await editInvoice(data, invoice.id);
        if (!isSubmitting) {
          setFormModal(false);
        }
      } else {
        createNewInvoice(data, Status.Pending);
        if (!isSubmitting) {
          setFormModal(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const addNewItem = () => {
    append({ name: "", quantity: 0, price: "", total: 0 });
  };

  const saveDraft = () => {
    try {
      createNewInvoice(getValues(), Status.Draft);
      setFormModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  function setTotal(index: number, quantity: string, price: number | string) {
    const amount = Number(Number(quantity) * Number(price));
    if (isNaN(amount)) {
      setValue(`items.${index}.total`, 0);
    } else {
      setValue(`items.${index}.total`, Number(amount.toFixed(2)));
    }
  }
  return (
    <form
      className="w-full max-w-[1000px] h-full bg-white px-16 py-10 medium:px-5 md:m-0 large:pt-20 dark:bg-dark-hover"
      onSubmit={handleSubmit((data) => {
        onFormSubmit(data);
      })}
    >
      <h1 className="text-2xl font-bold dark:text-white">
        {isEditing ? `Edit #${invoice.id}` : "New Invoice"}
      </h1>

      <FormSection>
        <FormHeader name={"Bill From"} />
        <FormFields data={billFromData} register={register} errors={errors} />
      </FormSection>
      <FormSection>
        <FormHeader name={"Bill To"} />
        <FormFields data={billToData} register={register} errors={errors} />
      </FormSection>
      <FormPaymentSection
        register={register}
        errors={errors}
        isEditing={isEditing}
      />

      <div className="grid grid-cols-7 col-span-3 gap-4 mt-16 w-full md:grid-cols-10 ">
        <h3 className="text-gray font-bold text-xl col-span-6 justify-self-start md:col-span-10">
          Item list
        </h3>
        {fields.map((field: Item, index: number) => (
          <Fragment key={field.id}>
            <div className="col-span-7 md:col-span-3">
              <label className="label">Item Name</label>
              <input
                {...register(`items.${index}.name`, {
                  required: "Field is required",
                })}
                type="text"
                className="inputField"
              />
              {errors.items?.[index]?.name && (
                <p className="text-red mt-2">
                  {errors.items?.[index]?.name?.message}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label className="label">Qty.</label>
              <input
                {...register(`items.${index}.quantity`, {
                  required: "Field is required",
                })}
                onChange={(e) => {
                  setTotal(
                    index,
                    e.target.value,
                    getValues(`items.${index}.price`)
                  );
                }}
                type="number"
                className="inputField"
              />
              {errors.items?.[index]?.quantity && (
                <p className="text-red mt-2">
                  {errors.items?.[index]?.quantity?.message}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label className="label">Price</label>
              <input
                {...register(`items.${index}.price`, {
                  required: "Field is required",
                })}
                onChange={(e) => {
                  setTotal(
                    index,
                    e.target.value,
                    getValues(`items.${index}.quantity`)
                  );
                }}
                type="number"
                className="inputField"
              />
              {errors.items?.[index]?.price && (
                <p className="text-red mt-2">
                  {errors.items?.[index]?.price?.message}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label className="label">Total</label>
              <input
                {...register(`items.${index}.total`)}
                type="number"
                disabled
                className="inputField"
              />
            </div>
            <button className="flex justify-center items-center h-full">
              <i
                className="bi bi-trash3-fill col-span-1 justify-self-end self-center"
                onClick={() => {
                  remove(index);
                }}
              ></i>
            </button>
          </Fragment>
        ))}
        <button
          className="bg-light-bg dark:bg-dark2 dark:text-light-white w-full max-w-full h-[56px] rounded-[28px] flex items-center justify-center font-bold text-gray gap-x-1 transition-all mt-9 place-self-center col-span-6 md:col-span-10"
          type="button"
          onClick={addNewItem}
        >
          + Add New item
        </button>
      </div>
      {isEditing ? (
        <div className="flex justify-end items-center gap-x-5 w-full mt-9">
          <ButtonCancel />
          <ButtonSend />
        </div>
      ) : (
        <div className="flex justify-between items-center gap-x-5 w-full mt-9">
          <ButtonCancel />
          <div className="flex justify-end gap-x-5 w-full">
            <ButtonDraft handleClick={saveDraft} />
            <ButtonSave />
          </div>
        </div>
      )}
    </form>
  );
}
