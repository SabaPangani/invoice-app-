import Image from "next/image";
import React from "react";
import empty from "../public/Empty.png";
export default function EmptyPage() {
  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <Image src={empty} alt="Empty image" />
      <h1 className="font-bold text-3xl mt-5 dark:text-white">There is nothing here</h1>
      <p className="text-gray text-center font-medium dark:text-light-white">
        Create an invoice by clicking the <br />
        <span className="font-bold">New Invoice</span> button and get started
      </p>
    </div>
  );
}
