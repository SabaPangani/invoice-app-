import { Invoice } from "@/lib/types";
import InvoiceFilter from "@/ui/InvoiceFilter";
import ButtonAdd from "@/ui/buttons/ButtonAdd";

export default function Header({
  statuses,
  data,
}: {
  statuses: string[];
  data: Invoice[];
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-[42px] font-bold text-black medium:text-[36px] dark:text-white">
          Invoices
        </h1>
        <p className="text-[14px] text-gray dark:text-light-white font-medium">
          <span className="medium:hidden">There are total</span> {data.length}{" "}
          invoices
        </p>
      </div>
      <div className="flex items-center justify-end gap-x-10 w-full medium:gap-x-5">
        <InvoiceFilter statuses={statuses} />
        <ButtonAdd />
      </div>
    </div>
  );
}
