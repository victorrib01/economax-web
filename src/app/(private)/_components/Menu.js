"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();

  const menuItems = [
    ["home", "Home"],
    ["categories", "Categorias"],
    ["registry", "Lista"],
    ["profile", "Perfil"],
  ];

  return (
    <div className="flex flex-row border-t min-w-full items-center justify-between h-[8%]">
      {menuItems.map((item) => {
        const isActive = pathname.startsWith(`/${item[0]}`);
        return (
          <Link
            href={`/${item[0]}`}
            key={item}
            className={`p-2 ${
              isActive ? "bg-blue-500 text-white rounded" : ""
            }`}
            prefetch={false}
          >
            {item[1]}
          </Link>
        );
      })}
    </div>
  );
}
