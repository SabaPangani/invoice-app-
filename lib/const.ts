import { Status } from "./types";

export const STATUS = [Status.Draft, Status.Pending, Status.Paid];

export const buttonNames = {
  edit: "Edit",
  new: "New",
  newInvoice: "New Invoice",
  back: "Go back",
  delete: "Delete",
  paid: "Mark as Paid",
  saveDraft: "Save as Draft",
  submitting: "Submitting",
  deleting: "In progress...",
  save: "Save Changes",
  send: "Save & Send",
  cancel: "Cancel",
};

export const errorMessage = {
  errorMessage: "Something went wrong!",
  tryAgain: "Try again",
  failedGetInvoices: "Database Error: Failed to Get Invoices",
  failedGetInvoiceById: "Database Error: Failed to Get Invoice by Id",
  failedChangeStatusToPaid: "Database Error: Failed to Change status to Paid",
  failedDeleteInvoice: "Database Error: Failed to Delete Invoice",
  failedCreateInvoice: "Database Error: Failed to Create Invoice",
  failedUpdateInvoice: "Database Error: Failed to Update Invoice",
  failedUpdateItem: "The items weren't updated",
  failedCreateItem: "The item wasn't created",
};

export const textAndHeaders = {
  noInvoice: "There is nothing here",
  createInvoice: "Create an invoice by clicking the",
  howToCreateInvoice: "button and get started",
  status: "Status",
  sent: "Sent to",
  bill: "Bill To",
  total: "Grand Total",
  amount: "Amount Due",
  notFound: "404 Not Found",
  notFoundMessage: "Could not find the requested invoice.",
  changeInvoice: "The invoice was changed",
};

export function deleteMessage(id: string) {
  return `Are you sure you want to delete invoice #${id}? This action cannot be undone.`;
}
