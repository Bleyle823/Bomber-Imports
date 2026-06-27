import type { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bomber Imports | Premium Smartphones in Kenya",
  description:
    "Your one-stop shop for the latest iPhones and premium imported flagship smartphones at the best prices in Kenya. Quality guaranteed by Bomber Imports.",
};

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default Layout;
