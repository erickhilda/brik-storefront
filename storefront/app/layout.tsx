import { Inter } from "next/font/google";
import { ReactNode, Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

import Navbar from "@/components/layout/navbar";
import { SITE_NAME } from "@/lib/env";
import "./globals.css";

export const metadata = {
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
