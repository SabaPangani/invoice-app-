import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Providers } from "./Providers";

const spartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoices",
  description: "App for accounts management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spartan.className} bg-no-repeat bg-light-bg dark:bg-dark-hover overflow-y-auto`}
      >
        <Providers>
          <Sidebar />

          <main className="mx-auto w-full max-w-[900px] pt-40 px-2">{children}</main>
          <div id="modal-root" />
        </Providers>
      </body>
    </html>
  );
}
