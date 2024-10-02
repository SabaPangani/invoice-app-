import { deleteInvoice, setInvoiceStatusToPaid } from "@/lib/actions";
import ButtonBack from "@/ui/buttons/ButtonBack";
import ButtonDelete from "@/ui/buttons/ButtonDelete";
import ButtonEdit from "@/ui/buttons/ButtonEdit";
import ButtonPaid from "@/ui/buttons/ButtonPaid";
import ModalDeleteInvoice from "@/ui/modal/ModalDeleteInvoice";
import ModalFormInvoice from "@/ui/modal/ModalFormInvoice";
import PortalFormWrapper from "@/ui/modal/PortalFormWrapper";
import PortalWrapper from "@/ui/modal/PortalWrapper";
import { notFound } from "next/navigation";
import { Status } from "@/lib/types";
import InvoiceStatus from "@/ui/InvoiceStatus";
import { formatPrice } from "@/lib/functions";
import { getInvoiceById } from "@/lib/db";

export const dynamic = "auto";
export default async function InvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const invoice = await getInvoiceById(params.id);
  const handleStatusChangeToPaid = setInvoiceStatusToPaid.bind(null, params.id);
  const handleDeleteInvoiceWithId = deleteInvoice.bind(null, params.id);

  if (!invoice) {
    notFound();
  }

  return (
    <>
      <div className="w-full flex flex-col gap-y-5">
        <div className="self-start">
          <ButtonBack />
        </div>
        <header className="flex justify-between bg-white px-5 py-5 rounded-lg dark:bg-dark1">
          <div className="flex items-center justify-center gap-x-5 medium:justify-between medium:w-full">
            <p className="text-btn-hover text-lg dark:text-light-white">
              Status
            </p>
            <InvoiceStatus status={invoice.status} />
          </div>
          <div className="flex items-center justify-end gap-x-5 w-full medium:hidden">
            <ButtonEdit />
            <ButtonDelete />
            <ButtonPaid
              handleClick={handleStatusChangeToPaid}
              disabled={invoice.status === Status.Paid}
            />
          </div>
        </header>

        <div className="flex flex-col bg-white px-7 py-10 dark:bg-dark1">
          <div className="flex flex-row items-center justify-between text-btn-hover dark:text-light-white font-medium medium:flex-col medium:justify-start medium:items-start">
            <div className="flex flex-col">
              <span className="font-bold text-xl text-black dark:text-white">
                <span className="text-gray">#</span>
                {invoice.id}
              </span>
              <span>{invoice?.description}</span>
            </div>
            <div className="flex flex-col text-right medium:text-left mt-5">
              <span>{invoice?.senderAddress.street}</span>
              <span>{invoice?.senderAddress.city}</span>
              <span>{invoice?.senderAddress.postCode}</span>
              <span>{invoice?.senderAddress.country}</span>
            </div>
          </div>
          <div className="flex justify-between mt-5 pr-16 flex-wrap medium:pr-0">
            <div className="font-medium flex flex-col gap-y-5">
              <p className="flex flex-col">
                <span className="text-btn-hover dark:text-light-white">
                  Invoice date
                </span>
                <span className="text-black text-lg font-bold dark:text-white">
                  {invoice?.createdAt.toLocaleDateString()}
                </span>
              </p>
              <p className="flex flex-col">
                <span className="text-gray dark:text-light-white">
                  Payment Due
                </span>
                <span className="text-black text-lg font-bold dark:text-white">
                  {invoice?.paymentDue.toLocaleDateString()}
                </span>
              </p>
            </div>
            <p className="flex flex-col text-btn-hover font-medium dark:text-light-white">
              <span>Bill To</span>
              <span className="text-black font-bold text-lg dark:text-white">
                Alex Gray
              </span>
              <span className="flex flex-col">
                {invoice?.client.clientName}{" "}
                <span>{invoice?.client.clientAddress.city}</span>{" "}
                <span>{invoice?.client.clientAddress.postCode}</span>{" "}
                {invoice?.client.clientAddress.country}
              </span>
            </p>
            <p className="text-btn-hover flex flex-col font-medium dark:text-light-white">
              Sent To{" "}
              <span className="text-black text-lg font-bold dark:text-white">
                {invoice?.client.clientEmail}
              </span>
            </p>
          </div>
          <div className="bg-[#F9FAFE] dark:bg-dark2 px-5 mt-5 py-5 rounded-tl-lg rounded-tr-lg">
            <header className="text-btn-hover flex justify-between items-center medium:hidden dark:text-light-white">
              <span>Item Name</span>
              <span>QTY.</span>
              <span>Price</span>
              <span>Total</span>
            </header>
            {invoice!.item.length > 0 &&
              invoice?.item.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mt-2"
                >
                  <div className="text-black font-bold text-xl dark:text-white">
                    {item.name}
                    <span className="medium:text-gray medium:block hidden text-base dark:text-light-white">{`${
                      item.quantity
                    } x ${formatPrice(item.price)}`}</span>
                  </div>
                  <span className="text-btn-hover font-bold ml-20 medium:hidden dark:text-light-white">
                    {item.quantity}
                  </span>
                  <span className="text-btn-hover font-bold medium:hidden dark:text-light-white">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-black font-bold text-lg dark:text-white">
                    {formatPrice(item.total)}
                  </span>
                </div>
              ))}
          </div>

          <div className="bg-[#373B53] dark:bg-black flex justify-between items-center text-light-white p-6 rounded-br-lg rounded-bl-md">
            <span className="dark:text-white">Amount Due</span>
            <span className="text-3xl font-medium">
              {formatPrice(invoice?.total)}
            </span>
          </div>
        </div>
        <PortalWrapper>
          <ModalDeleteInvoice
            id={params.id}
            handleClick={handleDeleteInvoiceWithId}
          />
        </PortalWrapper>
        <PortalFormWrapper>
          <ModalFormInvoice invoice={invoice} id={params.id} isEditing={true} />
        </PortalFormWrapper>

        <div className="items-center absolute left-0 bottom-0 gap-x-3 w-full bg-white py-5 px-5 hidden medium:flex">
          <ButtonEdit />
          <ButtonDelete />
          <ButtonPaid
            handleClick={handleStatusChangeToPaid}
            disabled={invoice.status === Status.Paid}
          />
        </div>
      </div>
    </>
  );
}
