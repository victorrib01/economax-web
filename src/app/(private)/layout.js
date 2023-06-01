"use client";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Economax Web",
  description: "Financial app",
};

export default function PrivateLayout({ children }) {
  const [currentPage, setCurrentPage] = useState("home");
  const handleItemClick = (page) => {
    setCurrentPage(page);
  };
  const menuItems = [
    ["home", "Home"],
    ["categories", "Categorias"],
    ["registry", "Lista"],
    ["profile", "Perfil"],
  ];
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="flex items-center justify-center max-w-full">
          <main className="min-h-screen h-screen w-full max-w-[512px] p-8 bg-slate-50">
            <div
              className="
                flex flex-col items-center justify-between h-full
                "
            >
              <div className="h-[92%] w-full">{children}</div>
              <div className="flex flex-row border-t min-w-full items-center justify-between h-[8%]">
                {menuItems.map((item) => (
                  <Link
                    href={`/${item[0]}`}
                    key={item}
                    className={`p-2 ${
                      currentPage === item[0]
                        ? "bg-blue-500 text-white rounded"
                        : ""
                    }`}
                    onClick={() => handleItemClick(item[0])}
                  >
                    {item[1]}
                  </Link>
                ))}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
