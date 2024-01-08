import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../../components/layout/header";
import ReduxProvider from "../store/ReduxProvider";
import { siteConfig } from "@/config/site";
import ProtectedRoute from "@/components/layout/protectedRoute";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/crm.png",
      href: "/crm.png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ProtectedRoute>
            <Header />
            {children}
          </ProtectedRoute>
        </ReduxProvider>
      </body>
    </html>
  );
}
