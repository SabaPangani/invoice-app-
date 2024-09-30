import EmptyPage from "@/components/EmptyPage";
import Header from "@/components/invoices/Header";
import { getAllInvoices, getFilteredInvoices } from "@/lib/db";
import { Invoice } from "@/lib/types";
import InvoiceCard from "@/ui/InvoiceCard";
import ModalFormInvoice from "@/ui/modal/ModalFormInvoice";
import PortalFormWrapper from "@/ui/modal/PortalFormWrapper";
import { Suspense } from "react";

export default async function InvoicePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let statuses = Array.isArray(searchParams?.status)
    ? searchParams?.status
    : searchParams?.status
    ? [searchParams?.status]
    : [];
  let data: any[] | undefined = [];
  let numberOfInvoices: number;
  let statusOfInvoices: string = "";

  if ((statuses.length === 0 && data !== undefined) || null) {
    data = await getAllInvoices();
    numberOfInvoices = data?.length || 0;
    statusOfInvoices = "total";
    console.log(data);
  } else {
    data = await getFilteredInvoices(statuses);
    numberOfInvoices = data?.length || 0;
    statusOfInvoices = statuses.join("/").toLowerCase();
  }
  return (
    <>
      <>
        <Header statuses={statuses} data={data!} />
        <Suspense
          fallback={<p>Loading...</p>}
          key={JSON.stringify(searchParams)}
        >
          <div className="flex flex-col gap-y-5 mt-10">
            {data?.length! > 0 ? (
              data?.map((invoice: Invoice) => <InvoiceCard invoice={invoice} />)
            ) : (
              <EmptyPage />
            )}
          </div>
        </Suspense>
      </>

      <PortalFormWrapper>
        <ModalFormInvoice isEditing={false} />
      </PortalFormWrapper>
    </>
  );
}
