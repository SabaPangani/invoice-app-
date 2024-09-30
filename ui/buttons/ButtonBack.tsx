"use client";
import { buttonNames } from "@/lib/const";
import { useRouter } from "next/navigation";

export default function ButtonBack() {
  const router = useRouter();

  return (
    <button
      className="flex flex-row font-bold items-center justify-center text-black hover:text-gray gap-x-3 transition-all dark:text-white"
      onClick={() => {
        router.push("/");
      }}
    >
      <i className="bi bi-caret-left-fill scale-75 rounded-full text-primary text-xl"></i>
      {buttonNames.back}
    </button>
  );
}
