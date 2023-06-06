import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Economax Web",
  description: "Financial app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
