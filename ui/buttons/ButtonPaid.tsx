"use client";
import { buttonNames } from "@/lib/const";

export default function ButtonPaid({
  handleClick,
  disabled,
}: {
  handleClick: any;
  disabled: boolean;
}) {
  return (
    <form action={handleClick} className="max-w-[170px] w-full">
      <button className="bg-primary w-full max-w-[170px] h-[48px] rounded-[28px] font-bold text-white hover:bg-secondaryPale transition-all disabled:opacity-40 disabled:hover:bg-primary" disabled={disabled}>
        <p>{buttonNames.paid}</p>
      </button>
    </form>
  );
}
