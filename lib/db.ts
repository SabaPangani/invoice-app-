import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { Client, FormInput, Invoice, Item, Status } from "./types";
import { setNewDate } from "./functions";

export async function createNewInvoiceDB(
  data: FormInput,
  invoiceId: string,
  currentDate: Date,
  total: number,
  status: Status
) {
  try {
    console.log(data);
    const senderAddress = await prisma.address.create({
      data: {
        street: data.senderStreetAddress,
        city: data.senderCity,
        postCode: data.senderPostCode,
        country: data.senderCountry,
      },
    });

    const client = await prisma.client.upsert({
      where: {
        clientInfo: {
          clientName: data.clientName,
          clientEmail: data.clientEmail,
        },
      },
      update: {},
      create: {
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientAddress: {
          create: {
            street: data.clientStreetAddress,
            city: data.clientCity,
            postCode: data.clientPostCode,
            country: data.clientCountry,
          },
        },
      },
      include: {
        clientAddress: true,
      },
    });

    const invoice = await prisma.invoice.create({
      data: {
        id: invoiceId,
        createdAt: currentDate,
        paymentDue: setNewDate(currentDate, data.paymentTerms),
        description: data.description,
        paymentTerms: Number(data.paymentTerms),
        status,
        clientId: client.id,
        addressId: senderAddress.id,
        total,
        item: {
          create: data.items.map((item) => ({
            name: item.name,
            quantity: Number(item.quantity),
            price: Number(item.price),
            total: Number(item.quantity) * Number(item.price),
          })),
        },
      },
    });

    return invoice;
  } catch (error) {
    console.error("Error creating invoice in DB:", error);
    throw error;
  }
}
export async function editInvoiceDB(
  invoice: Omit<Invoice, "item">,
  client: Client,
  invoiceItems: Item[]
) {
  try {
    const updateInvoice = await prisma.invoice.update({
      where: {
        id: invoice.id,
      },
      data: {
        paymentDue: invoice.paymentDue,
        paymentTerms: invoice.paymentTerms,
        description: invoice.description,
        status: invoice.status,
        total: invoice.total,
        client: {
          update: {
            clientName: client.clientName,
            clientEmail: client.clientEmail,
            clientAddress: {
              update: {
                street: client.clientAddress.street,
                city: client.clientAddress.city,
                postCode: client.clientAddress.postCode,
                country: client.clientAddress.country,
              },
            },
          },
        },
        senderAddress: {
          update: {
            street: invoice.senderAddress.street,
            city: invoice.senderAddress.city,
            postCode: invoice.senderAddress.postCode,
            country: invoice.senderAddress.country,
          },
        },
      },
    });

    if (!updateInvoice) {
      console.error("Failed to update invoice");
    }

    if (invoiceItems.length > 0) {
      const updateItems = await prisma.item.deleteMany({
        where: { invoiceId: invoice.id },
      });
    }

    for (let item of invoiceItems) {
      const newItem = await prisma.item.create({
        data: {
          name: item.name,
          quantity: +item.quantity,
          price: +item.price,
          total: +item.total,
          invoiceId: invoice.id,
        },
      });

      if (!newItem) {
        console.error("Failed to create item");
      }
    }
    return updateInvoice;
  } catch (error) {
    console.error("Error updating invoice in DB:", error);
    throw error;
  }
}
export const deleteInvoiceDB = async (id: string) => {
  noStore();
  try {
    const deleteInvoice = await prisma.invoice.delete({
      where: {
        id,
      },
    });
    if (!deleteInvoice) {
      throw new Error("Failed to delete invoice");
    }
    revalidatePath(`/`);
  } catch (error) {
    console.error(error);
  }
};
export const getAllInvoices = async () => {
  try {
    const data = await prisma.invoice.findMany({
      include: {
        senderAddress: true,
        client: { include: { clientAddress: true } },
        item: true,
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch invoices");
  }
};
export const getInvoiceById = async (id: string) => {
  try {
    const data = await prisma.invoice.findUnique({
      where: { id: id },
      include: {
        senderAddress: true,
        client: { include: { clientAddress: true } },
        item: true,
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch invoice");
  }
};
export const getFilteredInvoices = async (statuses: string[]) => {
  const filter: Status[] = [];
  statuses.filter((status) => {
    if (status === "Paid") {
      filter.push(Status.Paid);
    } else if (status === "Draft") {
      filter.push(Status.Draft);
    } else {
      filter.push(Status.Pending);
    }
  });
  try {
    const data = await prisma.invoice.findMany({
      include: {
        senderAddress: true,
        client: { include: { clientAddress: true } },
        item: true,
      },
      where: {
        status: { in: [...filter] },
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch invoice");
  }
};
