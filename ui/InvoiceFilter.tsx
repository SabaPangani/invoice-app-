"use client";
import Checkbox from "@/app/shared/Checkbox";
import { STATUS } from "@/lib/const";
import { useRouter } from "next/navigation";
import {
  useState,
  useRef,
  ChangeEvent,
  useOptimistic,
  startTransition,
} from "react";

export default function InvoiceFilter({ statuses }: { statuses: string[] }) {
  let router = useRouter();
  const [isFilterOpened, setFilterOpened] = useState(false);
  let [optimisticStatus, setOptimisticStatus] = useOptimistic(statuses);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  function handleCheck(e: ChangeEvent<HTMLInputElement>): void {
    let { name, checked } = e.target;
    let newStatus = checked
      ? [...optimisticStatus, name]
      : optimisticStatus.filter((optStatus) => optStatus !== name);

    let newParams = new URLSearchParams(
      newStatus.sort().map((status) => ["status", status])
    );

    startTransition(() => {
      setOptimisticStatus(newStatus.sort());
      router.push(`?${newParams}`);
    });
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setFilterOpened(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setFilterOpened(false);
    }, 500);
  };

  return (
    <div
      className="flex items-center cursor-pointer relative select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className="font-bold dark:text-white">
        Filter <span className="medium:hidden"> by status</span>
      </p>{" "}
      <i
        className={`bi bi-caret-down-fill text-primary ml-2 flex justify-center items-center ${
          isFilterOpened ? "rotate-180" : "rotate-0"
        }`}
      ></i>
      {isFilterOpened && (
        <div className="absolute dark:bg-dark2 dark:text-white bg-white top-10 w-[180px] py-5 px-2 flex flex-col gap-y-2 rounded-lg left-1/2 -translate-x-1/2 shadow-md z-10">
          {STATUS.map((status) => (
            <Checkbox
              key={status}
              id={status}
              name={status}
              onChange={(e) => {
                handleCheck(e);
              }}
              checked={optimisticStatus.includes(status)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
