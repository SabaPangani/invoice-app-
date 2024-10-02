"use server";
import { unstable_noStore as noStore } from "next/cache";
import {
  calculateTotal,
  formatCurrentDate,
  generateInvoiceId,
  setNewDate,
} from "./functions";
import { Client, FormInput, Invoice, Status } from "./types";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { createNewInvoiceDB, deleteInvoiceDB, editInvoiceDB } from "./db";

// export const createNewInvoice = async (data: FormInput, status: Status) => {
//   try {
//     let invoiceId = generateInvoiceId(6);
//     const currentDate = formatCurrentDate(data.invoiceDate);
//     console.log(data);

//     const senderAddress = await prisma.address.create({
//       data: {
//         street: data.senderStreetAddress,
//         city: data.senderCity,
//         postCode: data.senderPostCode,
//         country: data.senderCountry,
//       },
//     });

//     const client = await prisma.client.upsert({
//       where: {
//         clientInfo: {
//           clientName: data.clientName,
//           clientEmail: data.clientEmail,
//         },
//       },
//       update: {},
//       create: {
//         clientName: data.clientName,
//         clientEmail: data.clientEmail,
//         clientAddress: {
//           create: {
//             street: data.clientStreetAddress,
//             city: data.clientCity,
//             postCode: data.clientPostCode,
//             country: data.clientCountry,
//           },
//         },
//       },
//       include: {
//         clientAddress: true,
//       },
//     });

//     const total = calculateTotal(data.items);

//     const invoice = await prisma.invoice.create({
//       data: {
//         id: invoiceId,
//         createdAt: currentDate,
//         paymentDue: setNewDate(currentDate, data.paymentTerms),
//         description: data.description,
//         paymentTerms: Number(data.paymentTerms),
//         status,
//         clientId: client.id,
//         addressId: senderAddress.id,
//         total,
//         item: {
//           create: data.items.map((item) => ({
//             name: item.name,
//             quantity: Number(item.quantity),
//             price: Number(item.price),
//             total: Number(item.quantity) * Number(item.price),
//           })),
//         },
//       },
//     });

//     console.log("New invoice created:", invoice);
//     revalidatePath(`/`);
//     return invoice;
//   } catch (error) {
//     console.error("Error creating invoice:", error);
//   }
// };
export async function createNewInvoice(data: FormInput, status: Status) {
  try {
    const invoiceId = generateInvoiceId(6);
    const currentDate = formatCurrentDate(data.invoiceDate);
    const total = calculateTotal(data.items);

    const invoice = await createNewInvoiceDB(
      data,
      invoiceId,
      currentDate,
      total,
      status
      );
      revalidatePath("/")
    return invoice;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
} 

export async function editInvoice(data: FormInput, id: string | undefined) {
  let result;
  if (id) {
    console.log(data);
    const currentDate = new Date(Date.parse(data.invoiceDate));

    const client: Client = {
      id: 0,
      addressId: 0,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientAddress: {
        id: 0,
        street: data.clientStreetAddress,
        city: data.clientCity,
        postCode: data.clientPostCode,
        country: data.clientCountry,
      },
    };

    const invoice: Omit<Invoice, "item"> = {
      id: id,
      createdAt: formatCurrentDate(data.invoiceDate),
      description: data.description,
      status: Status.Pending,
      paymentDue: setNewDate(currentDate, Number(data.paymentTerms)),
      paymentTerms: Number(data.paymentTerms),
      clientId: 0,
      client: client,
      total: calculateTotal(data.items),
      addressId: 0,
      senderAddress: {
        id: 0,
        street: data.senderStreetAddress,
        city: data.senderCity,
        postCode: data.senderPostCode,
        country: data.senderCountry,
      },
    };

    result = await editInvoiceDB(invoice, client, data.items);
  } else {
    result = createNewInvoice(data, Status.Pending);
  }

  revalidatePath(`/invoices/${id}`);
  return result;
}

export const setInvoiceStatusToPaid = async (id: string) => {
  noStore();
  try {
    const updatedInvoice = await prisma.invoice.update({
      where: { id },
      data: { status: Status.Paid },
    });
    if (!updatedInvoice) {
      throw new Error("Failed to update invoice");
    }
    revalidatePath(`/invoices/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const deleteInvoice = async (id: string) => {
  try {
    await deleteInvoiceDB(id);
    revalidatePath(`/`);
  } catch (error) {
    console.error(error);
  }
};
