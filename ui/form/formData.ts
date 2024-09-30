import { formatDate } from "@/lib/functions";
import { FormField } from "@/lib/types";
import { Invoice } from "@prisma/client";

export const newInvoice = {
  id: "",
  createdAt: Date(),
  paymentDue: "",
  paymentTerms: 0,
  client: {
    clientName: "",
    clientEmail: "",
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
  },
  description: "",
  total: 0,
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  item: [],
};

export const defaultFormValues = (invoice: any) => {
  if (invoice) {
    return {
      senderStreetAddress: invoice.senderAddress.street,
      senderCity: invoice.senderAddress.city,
      senderPostCode: invoice.senderAddress.postCode,
      senderCountry: invoice.senderAddress.country,
      clientName: invoice.client.clientName,
      clientEmail: invoice.client.clientEmail,
      clientStreetAddress: invoice.client.clientAddress.street,
      clientCity: invoice.client.clientAddress.city,
      clientPostCode: invoice.client.clientAddress.postCode,
      clientCountry: invoice.client.clientAddress.country,
      invoiceDate: formatDate(invoice.createdAt),
      paymentTerms: invoice.paymentTerms,
      description: invoice.description,
      items: invoice.item.map((item: any) => {
        const newItem: any = {
          quantity: item.quantity.toString(),
          price: item.price.toString(),
          total: item.total,
          name: item.name,
        };
        return newItem;
      }),
    };
  } else {
    return {
      senderStreetAddress: "",
      senderCity: "",
      senderPostCode: "",
      senderCountry: "",
      clientName: "",
      clientEmail: "",
      clientStreetAddress: "",
      clientCity: "",
      clientPostCode: "",
      clientCountry: "",
      invoiceDate: new Date().toISOString().substring(0, 10),
      paymentTerms: 1,
      description: "",
      items: [],
    };
  }
};

export const billFromData: FormField[] = [
  {
    id: 1,
    name: "senderStreetAddress",
    label: "Street Address",
    type: "text",
    required: true,
    gridCols: 2,
    gridTabletCols: 3,
  },
  {
    id: 2,
    name: "senderCity",
    label: "City",
    type: "text",
    required: true,
    gridCols: 1,
    gridTabletCols: 1,
  },
  {
    id: 3,
    name: "senderPostCode",
    label: "Post Code",
    type: "text",
    required: true,
    gridCols: 1,
    gridTabletCols: 1,
  },
  {
    id: 4,
    name: "senderCountry",
    label: "Country",
    type: "text",
    required: true,
    gridCols: 1,
    gridTabletCols: 1,
  },
];

export const billToData: FormField[] = [
  {
    id: 1,
    name: "clientName",
    label: "Client’s Name",
    type: "text",
    required: true,
    gridCols: 2,
    gridTabletCols: 3,
  },
  {
    id: 2,
    name: "clientEmail",
    label: "Client’s Email",
    type: "text",
    required: true,
    gridCols: 2,
    gridTabletCols: 3,
  },
  {
    id: 3,
    name: "clientStreetAddress",
    label: "Street Address",
    type: "text",
    required: true,
    gridCols: 2,
    gridTabletCols: 3,
  },
  {
    id: 4,
    name: "clientCity",
    label: "City",
    type: "text",
    required: true,
    gridCols: 1,
    gridTabletCols: 1,
  },
  {
    id: 5,
    name: "clientPostCode",
    label: "Post Code",
    type: "text",
    required: true,
    gridCols: 1,
    gridTabletCols: 1,
  },
  {
    id: 6,
    name: "clientCountry",
    label: "Country",
    type: "text",
    required: true,
    gridCols: 1,
    gridTabletCols: 1,
  },
];

export const paymentTermsOptions = [
  {
    id: 1,
    value: 1,
    label: "Net 1 Day",
  },
  {
    id: 2,
    value: 7,
    label: "Net 7 Days",
  },
  {
    id: 3,
    value: 14,
    label: "Net 14 Days",
  },
  {
    id: 4,
    value: 30,
    label: "Net 30 Days",
  },
];
