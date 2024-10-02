import { Prisma } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import internal from "stream";

export enum Status {
  Paid = "Paid",
  Pending = "Pending",
  Draft = "Draft",
}

export type Address = {
  id?: number;
  street: string;
  city: string;
  postCode: string;
  country: string;
};
export type Client = {
  id?: number;
  clientName: string;
  clientEmail: string;
  clientAddress: Address;
  addressId?: number;
};

export type ItemPrisma = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
  invoiceId: string;
};

export type Item = {
  id?: string;
  name: string;
  quantity: number | string;
  price: number | string;
  total: number;
};

export type Invoice = {
  id: string;
  addressId: number;
  clientId: number;
  client: Client;
  senderAddress: Address;
  createdAt: Date;
  paymentDue: Date;
  description: string;
  paymentTerms: number;
  status: Status;
  items?: Item[];
  total: number;
};
export type ModalType = {
  isModalOpen: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export type ModalFormType = {
  isFormOpen: boolean;
  setFormModal: Dispatch<SetStateAction<boolean>>;
};
export interface ModifiedFormInput extends FormInput {
  invoiceId: string;
  clientId: number;
  addressId: number;
}
export type FormInput = {
  invoiceId: string;
  senderStreetAddress: string;
  senderCity: string;
  senderPostCode: string;
  senderCountry: string;
  clientName: string;
  clientEmail: string;
  clientStreetAddress: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  invoiceDate: string;
  paymentTerms: number;
  description: string;
  items: Item[];
};

export type FormField = {
  id: number;
  name: keyof FormInput;
  label: string;
  type: string;
  required: boolean;
  gridCols: number;
  gridTabletCols: number;
};

export type FilterCheckbox = {
  draft: boolean;
  pending: boolean;
  paid: boolean;
};
