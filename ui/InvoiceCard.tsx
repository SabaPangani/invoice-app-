import { Invoice } from "@/lib/types";
import Link from "next/link";
import React from "react";
import InvoiceStatus from "./InvoiceStatus";
import { formatPrice } from "@/lib/functions";

export default function InvoiceCard({ invoice }: { invoice: Invoice }) {
  return (
    <Link href={`/invoice/${invoice.id}`}>
      <div
        className="flex dark:bg-dark1 items-center justify-between bg-white rounded-md px-7 py-5"
        key={invoice.id}
      >
        <div className="flex medium:flex-col gap-x-10 items-center text-gray dark:text-white">
          <h1 className="font-bold text-xl text-black medium:mb-3 dark:text-white">
            <span className="text-gray">#</span>
            {invoice.id}
          </h1>
          <p className="font-medium dark:text-light-white">
            Due {invoice.createdAt.toLocaleDateString()}
          </p>
          <p className="medium:hidden font-medium">
            {invoice.client?.clientName}
          </p>
          <p className="font-bold text-xl text-black hidden medium:block">
            {formatPrice(invoice.total)}
          </p>
        </div>
        <div className="flex items-center gap-x-10 medium:flex-col gap-y-2 ">
          <p className="font-bold text-xl text-black medium:hidden dark:text-white">
            {formatPrice(invoice.total)}
          </p>
          <p className="hidden medium:block text-gray font-medium dark:text-white">
            {invoice.client?.clientName}
          </p>

          <InvoiceStatus status={invoice.status} />
        </div>
      </div>
    </Link>
  );
}
