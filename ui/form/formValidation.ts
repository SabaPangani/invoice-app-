import { z } from "zod";

const ItemSchema = z
  .object({
    name: z.string().min(5, { message: "Must be 5 or more characters long" }),
    quantity: z
      .string()
      .regex(/^\d+$/, { message: "The quantity must be a number" }),
    price: z
      .string()
      .regex(/^\d+$/, { message: "The quantity must be a number" }),
    total: z.number(),
  })
  .strict();

export const invoiceFormSchema = z.object({
  senderStreetAddress: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  senderCity: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  senderPostCode: z
    .string()
    .regex(/^\d{2}-\d{3}$/, { message: "The postcode's format is XX-XXX" }),
  senderCountry: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  clientName: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  clientEmail: z.string().email({ message: "Invalid email address" }),
  clientStreetAddress: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  clientCity: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  clientPostCode: z
    .string()
    .regex(/^\d{2}-\d{3}$/, { message: "The postcode's format is XX-XXX" }),
  clientCountry: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" }),
  invoiceData: z.string(),
  paymentTerms: z.number().positive(),
  description: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  items: ItemSchema.array(),
});
