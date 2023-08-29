import "@/styles/globals.css";
import TanstackProviders from "@/components/providers/TanstackProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteconfigs } from "@/constants";

const inter = Inter({ subsets: ["latin","latin-ext"] });

export const metadata: Metadata = {
  title: siteconfigs.title,
  description: siteconfigs.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProviders>{children}</TanstackProviders>
      </body>
    </html>
  );
}
