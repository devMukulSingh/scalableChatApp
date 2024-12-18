import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SocketProvider from "../context/SocketProvider";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "./lib/QueryProvider";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <Toaster/>
        <ClerkProvider>
          <QueryProvider>
            <SocketProvider>
              {children}
              </SocketProvider>
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
