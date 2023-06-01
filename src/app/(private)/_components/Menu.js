"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Menu({ loginCookie }) {
  const router = useRouter();
  const pathname = usePathname();
  const loginCookieParse = JSON.parse(loginCookie?.value || null);

  const [currentPage, setCurrentPage] = useState("");

  // const handleItemClick = (page) => {
  //   setCurrentPage(page);
  // };

  const menuItems = [
    ["home", "Home"],
    ["categories", "Categorias"],
    ["registry", "Lista"],
    ["profile", "Perfil"],
  ];
  useEffect(() => {
    setCurrentPage(pathname.replace("/", ""));
  }, [pathname]);

  useEffect(() => {
    if (!loginCookieParse) {
      router.push("/");
    }
  }, [loginCookieParse, router]);
  return (
    <div className="flex flex-row border-t min-w-full items-center justify-between h-[8%]">
      {menuItems.map((item) => (
        <Link
          href={`/${item[0]}`}
          key={item}
          className={`p-2 ${
            currentPage === item[0] ? "bg-blue-500 text-white rounded" : ""
          }`}
          // onClick={() => handleItemClick(item[0])}
        >
          {item[1]}
        </Link>
      ))}
    </div>
  );
}
