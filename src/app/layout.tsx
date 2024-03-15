import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import Navigation from "@/components/atoms/Navigation/Navigation";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for managing products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
