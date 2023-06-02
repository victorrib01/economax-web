"use client";

import { useRouter } from "next/navigation";

export default function Buttons() {
  const router = useRouter();
  return (
    <div className="h-[50%] flex flex-col justify-between items-center py-16">
      <div
        className="p-10 bg-white w-full flex items-center justify-center cursor-pointer"
        onClick={() => router.push("/registry/spends_by_category")}
      >
        Gastos por categoria
      </div>
      <div
        className="p-10 bg-white w-full flex items-center justify-center cursor-pointer"
        onClick={() => router.push("/registry/spends_history")}
      >
        Relátorio
      </div>
    </div>
  );
}
