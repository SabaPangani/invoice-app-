import React from "react";

export default function FormSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full max-w-full grid mt-9 gap-x-3 gap-y-6 grid-cols-2 md:grid-cols-3">
      {children}
    </section>
  );
}
