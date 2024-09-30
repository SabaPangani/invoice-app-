import { Status } from "@/lib/types";
import Image from "next/image";

export default function InvoiceStatus({ status }: { status: string }) {
  let color, bgColor;

  if (status === Status.Paid) {
    bgColor = "bg-[#33D69F]";
    color = "text-[#33D69F]";
  } else if (status === Status.Pending) {
    bgColor = "bg-[#FF8F00]";
    color = "text-[#FF8F00]";
  } else if (status === Status.Draft) {
    bgColor = "bg-[#373B53] dark:bg-secondaryPale";
    color = "text-[#373B53] dark:text-secondaryPale";
  }

  return (
    <div className="flex gap-5 justify-end">
      <div
        className={`flex items-center justify-center justify-self-end w-[105px] h-[50px] bg-opacity-10 dark:bg-opacity-5 rounded-md  ${bgColor}`}
      >
        <div className="flex items-center justify-between gap-x-2">
          <div className={`w-2 h-2 rounded-full ${bgColor} mb-1`}></div>
          <p className={`font-bold ${color}`}>{status}</p>
        </div>
      </div>
    </div>
  );
}
